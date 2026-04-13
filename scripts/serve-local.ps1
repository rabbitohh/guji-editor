param(
  [int]$Port = 8000
)

$ErrorActionPreference = "Stop"

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$listener = [System.Net.HttpListener]::new()
$prefix = "http://127.0.0.1:$Port/"
$listener.Prefixes.Add($prefix)

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

$listener.Start()
Write-Host ""
Write-Host "guji-editor local server started" -ForegroundColor Green
Write-Host "Root : $root"
Write-Host "URL  : $prefix"
Write-Host "Open : ${prefix}index.html"
Write-Host "Stop : Ctrl+C"
Write-Host ""

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    try {
      $path = Resolve-SafePath $request.Url.AbsolutePath
      if (-not (Test-Path $path)) {
        $response.StatusCode = 404
        $bytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
        $response.ContentType = "text/plain; charset=utf-8"
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
      } else {
        $bytes = [System.IO.File]::ReadAllBytes($path)
        $response.StatusCode = 200
        $response.ContentType = Get-ContentType $path
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
      }
    } catch {
      $response.StatusCode = 500
      $bytes = [System.Text.Encoding]::UTF8.GetBytes("500 Server Error`r`n$($_.Exception.Message)")
      $response.ContentType = "text/plain; charset=utf-8"
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } finally {
      $response.OutputStream.Close()
    }
  }
} finally {
  $listener.Stop()
  $listener.Close()
}
