param(
  [int]$Port = 8000,
  [int]$PortFallbackCount = 20
)

$ErrorActionPreference = "Stop"

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$listener = $null
$prefix = $null
$selectedPort = $null

$script:BaiduAccessToken = $null
$script:BaiduAccessTokenExpiresAt = Get-Date "2000-01-01"

function Get-ContentType {
  param([string]$Path)

  switch ([System.IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    ".html" { "text/html; charset=utf-8" }
    ".css" { "text/css; charset=utf-8" }
    ".js" { "application/javascript; charset=utf-8" }
    ".mjs" { "application/javascript; charset=utf-8" }
    ".json" { "application/json; charset=utf-8" }
    ".xml" { "application/xml; charset=utf-8" }
    ".txt" { "text/plain; charset=utf-8" }
    ".png" { "image/png" }
    ".jpg" { "image/jpeg" }
    ".jpeg" { "image/jpeg" }
    ".gif" { "image/gif" }
    ".svg" { "image/svg+xml" }
    ".pdf" { "application/pdf" }
    ".docx" { "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
    default { "application/octet-stream" }
  }
}

function Resolve-SafePath {
  param([string]$RequestedPath)

  $relativePath = [Uri]::UnescapeDataString($RequestedPath.TrimStart("/"))
  if ([string]::IsNullOrWhiteSpace($relativePath)) {
    $relativePath = "index.html"
  }

  $candidate = Join-Path $root $relativePath
  $fullPath = [System.IO.Path]::GetFullPath($candidate)
  if (-not $fullPath.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Blocked path traversal: $RequestedPath"
  }

  if ((Test-Path $fullPath) -and (Get-Item $fullPath).PSIsContainer) {
    $fullPath = Join-Path $fullPath "index.html"
  }

  return $fullPath
}

function Start-ListenerWithFallback {
  param(
    [int]$BasePort,
    [int]$FallbackCount
  )

  $lastError = $null

  for ($offset = 0; $offset -le $FallbackCount; $offset += 1) {
    $candidatePort = $BasePort + $offset
    $candidatePrefix = "http://127.0.0.1:$candidatePort/"
    $candidateListener = [System.Net.HttpListener]::new()
    $candidateListener.Prefixes.Add($candidatePrefix)

    try {
      $candidateListener.Start()
      return @{
        Listener = $candidateListener
        Prefix = $candidatePrefix
        Port = $candidatePort
        UsedFallback = ($offset -gt 0)
      }
    } catch {
      $lastError = $_
      $candidateListener.Close()
    }
  }

  throw $lastError
}

function Write-BytesResponse {
  param(
    $Response,
    [int]$StatusCode,
    [byte[]]$Bytes,
    [string]$ContentType
  )

  $Response.StatusCode = $StatusCode
  $Response.ContentType = $ContentType
  $Response.ContentLength64 = $Bytes.Length
  $Response.Headers["Cache-Control"] = "no-store"
  $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
}

function Write-TextResponse {
  param(
    $Response,
    [int]$StatusCode,
    [string]$Content,
    [string]$ContentType = "text/plain; charset=utf-8"
  )

  $bytes = [System.Text.Encoding]::UTF8.GetBytes([string]$Content)
  Write-BytesResponse -Response $Response -StatusCode $StatusCode -Bytes $bytes -ContentType $ContentType
}

function Write-JsonResponse {
  param(
    $Response,
    [int]$StatusCode,
    $Body
  )

  $json = $Body | ConvertTo-Json -Depth 12 -Compress
  Write-TextResponse -Response $Response -StatusCode $StatusCode -Content $json -ContentType "application/json; charset=utf-8"
}

function ConvertFrom-JsonCompat {
  param([string]$JsonText)

  $convertFromJson = Get-Command ConvertFrom-Json -ErrorAction Stop
  if ($convertFromJson.Parameters.ContainsKey("Depth")) {
    return $JsonText | ConvertFrom-Json -Depth 12
  }

  return $JsonText | ConvertFrom-Json
}

function Read-RequestText {
  param($Request)

  $encoding = if ($Request.ContentEncoding) { $Request.ContentEncoding } else { [System.Text.Encoding]::UTF8 }
  $reader = [System.IO.StreamReader]::new($Request.InputStream, $encoding)
  try {
    return $reader.ReadToEnd()
  } finally {
    $reader.Dispose()
  }
}

function Normalize-ImageBase64 {
  param([string]$ImageValue)

  if ([string]::IsNullOrWhiteSpace($ImageValue)) {
    return $null
  }

  $trimmed = $ImageValue.Trim()
  if ($trimmed.StartsWith("data:", [System.StringComparison]::OrdinalIgnoreCase)) {
    $commaIndex = $trimmed.IndexOf(",")
    if ($commaIndex -lt 0) {
      throw "Invalid data URL image payload."
    }
    $trimmed = $trimmed.Substring($commaIndex + 1)
  }

  return ($trimmed -replace "\s+", "")
}

function Get-BaiduAccessToken {
  if ($script:BaiduAccessToken -and $script:BaiduAccessTokenExpiresAt -gt (Get-Date).AddMinutes(5)) {
    return $script:BaiduAccessToken
  }

  if ([string]::IsNullOrWhiteSpace($env:BAIDU_OCR_API_KEY) -or [string]::IsNullOrWhiteSpace($env:BAIDU_OCR_SECRET_KEY)) {
    throw "Missing BAIDU_OCR_API_KEY or BAIDU_OCR_SECRET_KEY environment variable."
  }

  $tokenResponse = Invoke-RestMethod `
    -Method Post `
    -Uri "https://aip.baidubce.com/oauth/2.0/token" `
    -Body @{
      grant_type = "client_credentials"
      client_id = $env:BAIDU_OCR_API_KEY
      client_secret = $env:BAIDU_OCR_SECRET_KEY
    } `
    -ContentType "application/x-www-form-urlencoded"

  if (-not $tokenResponse.access_token) {
    throw "Failed to fetch Baidu access token."
  }

  $script:BaiduAccessToken = $tokenResponse.access_token
  $expiresIn = if ($tokenResponse.expires_in) { [int]$tokenResponse.expires_in } else { 2592000 }
  $script:BaiduAccessTokenExpiresAt = (Get-Date).AddSeconds($expiresIn)
  return $script:BaiduAccessToken
}

function Invoke-JsonPostUtf8 {
  param(
    [string]$Uri,
    [hashtable]$Body
  )

  $response = Invoke-WebRequest `
    -Method Post `
    -Uri $Uri `
    -Body $Body `
    -ContentType "application/x-www-form-urlencoded" `
    -UseBasicParsing

  $responseBytes =
    if ($response.RawContentStream) {
      try {
        $stream = $response.RawContentStream
        if ($stream.CanSeek) {
          $stream.Position = 0
        }
        $memory = [System.IO.MemoryStream]::new()
        $stream.CopyTo($memory)
        $memory.ToArray()
      } finally {
        if ($memory) {
          $memory.Dispose()
        }
      }
    } else {
      [System.Text.Encoding]::UTF8.GetBytes([string]$response.Content)
    }

  $jsonText = [System.Text.Encoding]::UTF8.GetString($responseBytes)
  return ConvertFrom-JsonCompat -JsonText $jsonText
}

function Get-OcrBounds {
  param($Node)

  if ($null -ne $Node.location) {
    return @{
      left = [double]$Node.location.left
      top = [double]$Node.location.top
      width = [double]$Node.location.width
      height = [double]$Node.location.height
    }
  }

  if ($null -ne $Node.vertexes_location) {
    $points = @($Node.vertexes_location)
    if ($points.Count -gt 0) {
      $xs = @($points | ForEach-Object { [double]$_.x })
      $ys = @($points | ForEach-Object { [double]$_.y })
      $minX = ($xs | Measure-Object -Minimum).Minimum
      $maxX = ($xs | Measure-Object -Maximum).Maximum
      $minY = ($ys | Measure-Object -Minimum).Minimum
      $maxY = ($ys | Measure-Object -Maximum).Maximum
      return @{
        left = $minX
        top = $minY
        width = [Math]::Max(1, $maxX - $minX)
        height = [Math]::Max(1, $maxY - $minY)
      }
    }
  }

  return $null
}

function Get-OcrConfidence {
  param($Node)

  if ($null -ne $Node.probability) {
    if ($Node.probability.PSObject.Properties.Name -contains "average") {
      return [double]$Node.probability.average
    }
    if ($Node.probability.PSObject.Properties.Name -contains "probability") {
      return [double]$Node.probability.probability
    }
  }

  if ($Node.PSObject.Properties.Name -contains "score" -and $null -ne $Node.score) {
    return [double]$Node.score
  }

  return $null
}

function New-OcrItem {
  param(
    [string]$Text,
    $Node,
    [string]$Level
  )

  if ([string]::IsNullOrWhiteSpace($Text)) {
    return $null
  }

  $bounds = Get-OcrBounds $Node
  if ($null -eq $bounds) {
    return $null
  }

  return @{
    text = $Text.Trim()
    level = $Level
    left = $bounds.left
    top = $bounds.top
    width = $bounds.width
    height = $bounds.height
    confidence = Get-OcrConfidence $Node
  }
}

function Convert-BaiduOcrResponse {
  param($OcrResponse)

  $items = [System.Collections.Generic.List[object]]::new()
  foreach ($word in @($OcrResponse.words_result)) {
    $chars = @($word.chars)
    if ($chars.Count -gt 0) {
      foreach ($char in $chars) {
        $text = if ($char.PSObject.Properties.Name -contains "char") { [string]$char.char } else { [string]$char.text }
        $item = New-OcrItem -Text $text -Node $char -Level "char"
        if ($null -ne $item) {
          $items.Add($item)
        }
      }
      continue
    }

    $text = if ($word.PSObject.Properties.Name -contains "words") { [string]$word.words } else { [string]$word.text }
    $item = New-OcrItem -Text $text -Node $word -Level "word"
    if ($null -ne $item) {
      $items.Add($item)
    }
  }

  return $items
}

function Invoke-BaiduOcr {
  param([string]$ImageBase64)

  $token = Get-BaiduAccessToken
  $uri = "https://aip.baidubce.com/rest/2.0/ocr/v1/accurate?access_token=$token"
  return Invoke-JsonPostUtf8 `
    -Uri $uri `
    -Body @{
      image = $ImageBase64
      detect_direction = "true"
      probability = "true"
      recognize_granularity = "small"
      vertexes_location = "true"
    }
}

function Handle-OcrConfig {
  param($Response)

  $configured = -not (
    [string]::IsNullOrWhiteSpace($env:BAIDU_OCR_API_KEY) -or
    [string]::IsNullOrWhiteSpace($env:BAIDU_OCR_SECRET_KEY)
  )

  Write-JsonResponse -Response $Response -StatusCode 200 -Body @{
    configured = $configured
    provider = "baidu-ocr"
    endpoint = "/api/ocr/page"
  }
}

function Handle-OcrPage {
  param($Request, $Response)

  try {
    $payloadText = Read-RequestText $Request
    if ([string]::IsNullOrWhiteSpace($payloadText)) {
      Write-JsonResponse -Response $Response -StatusCode 400 -Body @{ error = "Request body is required." }
      return
    }

    $payload = ConvertFrom-JsonCompat -JsonText $payloadText
    $imageBase64 = Normalize-ImageBase64 $payload.imageBase64
    if (-not $imageBase64) {
      $imageBase64 = Normalize-ImageBase64 $payload.imageDataUrl
    }
    if (-not $imageBase64) {
      Write-JsonResponse -Response $Response -StatusCode 400 -Body @{ error = "imageBase64 or imageDataUrl is required." }
      return
    }

    $ocrResponse = Invoke-BaiduOcr -ImageBase64 $imageBase64
    if ($ocrResponse.error_code) {
      Write-JsonResponse -Response $Response -StatusCode 502 -Body @{
        error = "Baidu OCR error $($ocrResponse.error_code): $($ocrResponse.error_msg)"
      }
      return
    }

    $items = Convert-BaiduOcrResponse $ocrResponse
    Write-JsonResponse -Response $Response -StatusCode 200 -Body @{
      pageId = [string]$payload.pageId
      provider = "baidu-ocr"
      itemCount = $items.Count
      items = $items
    }
  } catch {
    Write-JsonResponse -Response $Response -StatusCode 500 -Body @{
      error = $_.Exception.Message
    }
  }
}

$listenerInfo = Start-ListenerWithFallback -BasePort $Port -FallbackCount $PortFallbackCount
$listener = $listenerInfo.Listener
$prefix = $listenerInfo.Prefix
$selectedPort = $listenerInfo.Port

Write-Host ""
Write-Host "guji-editor local server started" -ForegroundColor Green
Write-Host "Root : $root"
Write-Host "URL  : $prefix"
Write-Host "Open : ${prefix}index.html"
if ($listenerInfo.UsedFallback) {
  Write-Host "Port : $Port was unavailable, switched to $selectedPort" -ForegroundColor Yellow
}
if ([string]::IsNullOrWhiteSpace($env:BAIDU_OCR_API_KEY) -or [string]::IsNullOrWhiteSpace($env:BAIDU_OCR_SECRET_KEY)) {
  Write-Host "OCR  : disabled (set BAIDU_OCR_API_KEY and BAIDU_OCR_SECRET_KEY first)" -ForegroundColor Yellow
} else {
  Write-Host "OCR  : baidu enabled"
}
Write-Host "Stop : Ctrl+C"
Write-Host ""

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    try {
      $route = $request.Url.AbsolutePath
      if ($request.HttpMethod -eq "GET" -and $route -eq "/api/ocr/config") {
        Handle-OcrConfig -Response $response
      } elseif ($request.HttpMethod -eq "POST" -and $route -eq "/api/ocr/page") {
        Handle-OcrPage -Request $request -Response $response
      } else {
        $path = Resolve-SafePath $route
        if (-not (Test-Path $path)) {
          Write-TextResponse -Response $response -StatusCode 404 -Content "404 Not Found"
        } else {
          $bytes = [System.IO.File]::ReadAllBytes($path)
          Write-BytesResponse -Response $response -StatusCode 200 -Bytes $bytes -ContentType (Get-ContentType $path)
        }
      }
    } catch {
      Write-TextResponse -Response $response -StatusCode 500 -Content "500 Server Error`r`n$($_.Exception.Message)"
    } finally {
      $response.OutputStream.Close()
    }
  }
} finally {
  $listener.Stop()
  $listener.Close()
}
