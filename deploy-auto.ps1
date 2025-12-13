# Automatic LMS Deployment Script
$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VALT LMS AUTOMATIC DEPLOYMENT" -ForegroundColor Cyan
Write-Host "  Server: lms.valtara.ai (188.245.43.183)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$SERVER_USER = "ubuntu"
$SERVER_IP = "188.245.43.183"
$SSH_KEY = "$env:USERPROFILE\Downloads\Francis\ubuntu-ky.pem"
$REMOTE_DIR = "/var/www/valt-lms"

# Check SSH key
Write-Host "[1/6] Checking SSH key..." -ForegroundColor Yellow
if (-not (Test-Path $SSH_KEY)) {
    Write-Host "ERROR: SSH key not found at: $SSH_KEY" -ForegroundColor Red
    exit 1
}
Write-Host "OK - SSH key found" -ForegroundColor Green

# Test SSH connection
Write-Host "`n[2/6] Testing SSH connection..." -ForegroundColor Yellow
$testResult = ssh -i $SSH_KEY -o StrictHostKeyChecking=no -o ConnectTimeout=10 "$SERVER_USER@$SERVER_IP" "echo 'OK'" 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Cannot connect to server" -ForegroundColor Red
    Write-Host $testResult -ForegroundColor Red
    exit 1
}
Write-Host "OK - SSH connection successful" -ForegroundColor Green

# Setup remote server
Write-Host "`n[3/6] Setting up remote server..." -ForegroundColor Yellow
$setupScript = @'
sudo mkdir -p /var/www/valt-lms
sudo chown -R ubuntu:ubuntu /var/www/valt-lms

if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    sudo npm install -g pm2
fi

if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    sudo apt-get update
    sudo apt-get install -y nginx
fi
'@

$setupScript | ssh -i $SSH_KEY -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "bash -s"
Write-Host "OK - Server setup complete" -ForegroundColor Green

# Upload files
Write-Host "`n[4/6] Uploading application files..." -ForegroundColor Yellow

$files = @("package.json", "package-lock.json", "next.config.js", "tsconfig.json", "tailwind.config.ts", "postcss.config.js", "next-env.d.ts")
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "  Uploading $file..." -ForegroundColor Gray
        scp -i $SSH_KEY -o StrictHostKeyChecking=no $file "${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/" 2>&1 | Out-Null
    }
}

Write-Host "  Uploading src/ directory..." -ForegroundColor Gray
scp -i $SSH_KEY -o StrictHostKeyChecking=no -r "src" "${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/" 2>&1 | Out-Null

Write-Host "  Uploading public/ directory..." -ForegroundColor Gray
scp -i $SSH_KEY -o StrictHostKeyChecking=no -r "public" "${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/" 2>&1 | Out-Null

if (Test-Path "prisma") {
    Write-Host "  Uploading prisma/ directory..." -ForegroundColor Gray
    scp -i $SSH_KEY -o StrictHostKeyChecking=no -r "prisma" "${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/" 2>&1 | Out-Null
}

Write-Host "OK - Files uploaded" -ForegroundColor Green

# Install and start application
Write-Host "`n[5/6] Installing dependencies and starting application..." -ForegroundColor Yellow

$deployScript = @'
set -e
cd /var/www/valt-lms

echo "Installing dependencies..."
npm install --production

echo "Building application..."
npm run build

echo "Stopping existing process..."
pm2 delete valt-lms 2>/dev/null || true

echo "Starting application..."
pm2 start npm --name "valt-lms" -- start
pm2 save

echo "Configuring PM2 startup..."
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu

echo "Done!"
'@

$deployScript | ssh -i $SSH_KEY -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "bash -s"
Write-Host "OK - Application started" -ForegroundColor Green

# Configure Nginx
Write-Host "`n[6/6] Configuring Nginx..." -ForegroundColor Yellow

$nginxScript = @'
sudo tee /etc/nginx/sites-available/valt-lms > /dev/null << 'NGINXEOF'
server {
    listen 80;
    server_name lms.valtara.ai 188.245.43.183;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINXEOF

sudo ln -sf /etc/nginx/sites-available/valt-lms /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
sudo systemctl enable nginx
'@

$nginxScript | ssh -i $SSH_KEY -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "bash -s"
Write-Host "OK - Nginx configured" -ForegroundColor Green

# Verify deployment
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your application is now live at:" -ForegroundColor Cyan
Write-Host "  http://lms.valtara.ai" -ForegroundColor Green
Write-Host "  http://188.245.43.183" -ForegroundColor Green
Write-Host ""

# Get PM2 status
Write-Host "Application Status:" -ForegroundColor Cyan
ssh -i $SSH_KEY -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "pm2 status"

Write-Host "`nUseful Commands:" -ForegroundColor Cyan
Write-Host "  View logs:    ssh -i `"$SSH_KEY`" $SERVER_USER@$SERVER_IP 'pm2 logs valt-lms'" -ForegroundColor Gray
Write-Host "  Restart app:  ssh -i `"$SSH_KEY`" $SERVER_USER@$SERVER_IP 'pm2 restart valt-lms'" -ForegroundColor Gray
Write-Host "  Stop app:     ssh -i `"$SSH_KEY`" $SERVER_USER@$SERVER_IP 'pm2 stop valt-lms'" -ForegroundColor Gray
Write-Host ""
Write-Host "Next Steps (Optional):" -ForegroundColor Cyan
Write-Host "  1. Setup SSL: ssh to server and run 'sudo certbot --nginx -d lms.valtara.ai'" -ForegroundColor Gray
Write-Host "  2. Configure environment variables in /var/www/valt-lms/.env.production" -ForegroundColor Gray
Write-Host ""
