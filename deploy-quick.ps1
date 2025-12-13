# One-Command Deployment Script
# This script handles everything automatically

param(
    [switch]$SkipBuild,
    [switch]$Verbose
)

$ErrorActionPreference = "Stop"

Write-Host @"

╔══════════════════════════════════════════════════════════╗
║                                                          ║
║           🚀 VALT LMS DEPLOYMENT WIZARD 🚀              ║
║                                                          ║
║  Server: lms.valtara.ai (188.245.43.183)               ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝

"@ -ForegroundColor Cyan

# Configuration
$SERVER_USER = "ubuntu"
$SERVER_IP = "188.245.43.183"
$SSH_KEY = "$env:USERPROFILE\Downloads\Francis\ubuntu-ky.pem"

# Step 1: Check prerequisites
Write-Host "`n[1/6] 🔍 Checking prerequisites..." -ForegroundColor Yellow

if (-not (Test-Path $SSH_KEY)) {
    Write-Host "❌ SSH key not found at: $SSH_KEY" -ForegroundColor Red
    Write-Host "Please ensure the SSH key is in the correct location." -ForegroundColor Red
    exit 1
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Prerequisites OK" -ForegroundColor Green

# Step 2: Build the application
if (-not $SkipBuild) {
    Write-Host "`n[2/6] 📦 Building application..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Build complete" -ForegroundColor Green
} else {
    Write-Host "`n[2/6] ⏭️  Skipping build" -ForegroundColor Gray
}

# Step 3: Test SSH connection
Write-Host "`n[3/6] 🔐 Testing SSH connection..." -ForegroundColor Yellow
$testConnection = ssh -i $SSH_KEY -o StrictHostKeyChecking=no -o ConnectTimeout=10 "$SERVER_USER@$SERVER_IP" "echo 'Connection successful'" 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Cannot connect to server" -ForegroundColor Red
    Write-Host "Error: $testConnection" -ForegroundColor Red
    exit 1
}
Write-Host "✅ SSH connection successful" -ForegroundColor Green

# Step 4: Upload files
Write-Host "`n[4/6] 📤 Uploading files to server..." -ForegroundColor Yellow

$filesToUpload = @(
    "package.json",
    "package-lock.json",
    "next.config.js",
    "tsconfig.json",
    "tailwind.config.ts",
    "postcss.config.js",
    "next-env.d.ts",
    ".env.production.example"
)

foreach ($file in $filesToUpload) {
    if (Test-Path $file) {
        Write-Host "  Uploading $file..." -ForegroundColor Gray
        scp -i $SSH_KEY -o StrictHostKeyChecking=no $file "${SERVER_USER}@${SERVER_IP}:/var/www/valt-lms/" 2>&1 | Out-Null
    }
}

Write-Host "  Uploading src/ directory..." -ForegroundColor Gray
scp -i $SSH_KEY -o StrictHostKeyChecking=no -r "src" "${SERVER_USER}@${SERVER_IP}:/var/www/valt-lms/" 2>&1 | Out-Null

Write-Host "  Uploading public/ directory..." -ForegroundColor Gray
scp -i $SSH_KEY -o StrictHostKeyChecking=no -r "public" "${SERVER_USER}@${SERVER_IP}:/var/www/valt-lms/" 2>&1 | Out-Null

if (Test-Path "prisma") {
    Write-Host "  Uploading prisma/ directory..." -ForegroundColor Gray
    scp -i $SSH_KEY -o StrictHostKeyChecking=no -r "prisma" "${SERVER_USER}@${SERVER_IP}:/var/www/valt-lms/" 2>&1 | Out-Null
}

Write-Host "✅ Files uploaded" -ForegroundColor Green

# Step 5: Install and build on server
Write-Host "`n[5/6] ⚙️  Installing dependencies on server..." -ForegroundColor Yellow

$remoteScript = @'
set -e
cd /var/www/valt-lms

echo "Installing dependencies..."
npm install --production

echo "Building application..."
npm run build

echo "Restarting application..."
pm2 delete valt-lms 2>/dev/null || true
pm2 start npm --name "valt-lms" -- start
pm2 save

echo "Done!"
'@

$remoteScript | ssh -i $SSH_KEY -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "bash -s"

Write-Host "✅ Application deployed and started" -ForegroundColor Green

# Step 6: Verify deployment
Write-Host "`n[6/6] ✔️  Verifying deployment..." -ForegroundColor Yellow

$status = ssh -i $SSH_KEY -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "pm2 status valt-lms" 2>&1

Write-Host "`nPM2 Status:" -ForegroundColor Cyan
Write-Host $status

Write-Host @"

╔══════════════════════════════════════════════════════════╗
║                                                          ║
║              ✅ DEPLOYMENT SUCCESSFUL! ✅                ║
║                                                          ║
║  Your application is now live at:                       ║
║                                                          ║
║  🌐 http://lms.valtara.ai                               ║
║  🌐 http://188.245.43.183                               ║
║                                                          ║
║  Useful commands:                                        ║
║  • View logs:    .\ssh-connect.bat                      ║
║                  pm2 logs valt-lms                       ║
║                                                          ║
║  • Restart app:  ssh ... 'pm2 restart valt-lms'        ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝

"@ -ForegroundColor Green

Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Setup SSL: ssh to server and run 'sudo certbot --nginx -d lms.valtara.ai'" -ForegroundColor Gray
Write-Host "   2. Configure environment variables in /var/www/valt-lms/.env.production" -ForegroundColor Gray
Write-Host "   3. Monitor your application with: pm2 monit" -ForegroundColor Gray
