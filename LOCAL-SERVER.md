# Local Server

Use the editor through a local HTTP server instead of opening `index.html` with `file://`.

The local server now also proxies Baidu OCR requests, so PDF import and OCR both work through the same entry point.

## Windows

Double-click `start-local-server.bat`

If OCR keys are missing, the batch file will prompt for them before starting.

Or run:

```powershell
.\scripts\serve-local.ps1 -Port 8000
```

Then open:

```text
http://127.0.0.1:8000/index.html
```

## Enable Baidu OCR

You can use any of these methods:

1. Double-click `start-local-server.bat` and paste the keys when prompted.
2. Copy `start-local-server.env.example.bat` to `start-local-server.env.bat`, fill in the values, then double-click `start-local-server.bat`.
3. Set these environment variables in the same PowerShell window before starting the server:

```powershell
$env:BAIDU_OCR_API_KEY = "your-api-key"
$env:BAIDU_OCR_SECRET_KEY = "your-secret-key"
.\scripts\serve-local.ps1 -Port 8000
```

## How It Works

- Static files are served from the repo root.
- `POST /api/ocr/page` forwards the current page image to Baidu OCR.
- OCR results are flattened into text boxes and returned to the browser.

## Why

- PDF import works more reliably
- Local assets and workers load correctly
- Browser security restrictions from `file://` are avoided
- Baidu OCR keys stay on the server side instead of leaking to the browser
