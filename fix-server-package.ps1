# Quick Fix: Upload package.json to server and rebuild
# Run this from the LMS project directory

$Server = "root@lms.valtara.ai"
$RemotePath = "/var/www/valt-lms"

Write-Host "=== Quick Fix: Uploading package.json ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Upload the correct package.json
Write-Host "1. Uploading package.json to server..." -ForegroundColor Yellow
scp "package.json" "${Server}:${RemotePath}/package.json"

if ($LASTEXITCODE -eq 0) {
    Write-Host "   SUCCESS: package.json uploaded" -ForegroundColor Green
} else {
    Write-Host "   FAILED: Could not upload package.json" -ForegroundColor Red
    Write-Host "   Make sure you can SSH to the server: ssh $Server" -ForegroundColor Red
    exit 1
}

# Step 2: Verify the file is valid JSON on server
Write-Host ""
Write-Host "2. Verifying JSON is valid on server..." -ForegroundColor Yellow
ssh $Server "cd $RemotePath && cat package.json | python3 -m json.tool > /dev/null && echo 'JSON is valid!'"

# Step 3: Run npm install and build
Write-Host ""
Write-Host "3. Running npm install on server..." -ForegroundColor Yellow
ssh $Server "cd $RemotePath && npm install"

Write-Host ""
Write-Host "4. Running npm run build on server..." -ForegroundColor Yellow
ssh $Server "cd $RemotePath && npm run build"

Write-Host ""
Write-Host "5. Restarting PM2..." -ForegroundColor Yellow
ssh $Server "pm2 restart valt-lms"

Write-Host ""
Write-Host "6. Checking port 3000..." -ForegroundColor Yellow
ssh $Server "ss -tulpn | grep 3000"

Write-Host ""
Write-Host "7. Recent PM2 logs:" -ForegroundColor Yellow
ssh $Server "pm2 logs valt-lms --lines 20 --nostream"

Write-Host ""
Write-Host "=== Done! Check https://lms.valtara.ai ===" -ForegroundColor Green
