# Startup script for Choshmazone Backend
Write-Host "Checking for PHP..." -ForegroundColor Cyan
$php = Get-Command php -ErrorAction SilentlyContinue

if (!$php) {
    if (Test-Path "C:\xampp\php\php.exe") {
        $phpPath = "C:\xampp\php\php.exe"
        Write-Host "PHP found at $phpPath" -ForegroundColor Green
    }
    else {
        Write-Host "PHP not found in PATH or C:\xampp\php\" -ForegroundColor Red
        Write-Host "Please ensure PHP is installed, or start your local server manually." -ForegroundColor Yellow
        exit
    }
}
else {
    $phpPath = "php"
}

Write-Host "Starting PHP server on http://localhost:8000..." -ForegroundColor Green
Start-Process $phpPath -ArgumentList "-S localhost:8000 -t ." -WindowStyle Minimized

Write-Host "Waiting for server to start..." -ForegroundColor Cyan
Start-Sleep -Seconds 2

Write-Host "Running Database Test and Setup..." -ForegroundColor Cyan
Invoke-WebRequest -Uri "http://localhost:8000/api/test_db.php" -UseBasicParsing | Select-Object -ExpandProperty Content

Write-Host "Backend should be ready now!" -ForegroundColor Green
Write-Host "Make sure your Vite server (npm run dev) is also running." -ForegroundColor Yellow
