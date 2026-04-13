# Local Server

Use the editor through a local HTTP server instead of opening `index.html` with `file://`.

## Windows

Double-click `start-local-server.bat`

Or run:

```powershell
.\scripts\serve-local.ps1 -Port 8000
```

Then open:

```text
http://127.0.0.1:8000/index.html
```

## Why

- PDF import works more reliably
- Local assets and workers load correctly
- Browser security restrictions from `file://` are avoided
