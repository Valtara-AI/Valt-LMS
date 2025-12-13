# LMS Deployment Script for Windows PowerShell
# Server: lms.valtara.ai (188.245.43.183)

$ErrorActionPreference = "Stop"

# Configuration
$SERVER_USER = "ubuntu"
$SERVER_IP = "188.245.43.183"
$SERVER_DOMAIN = "lms.valtara.ai"
$SSH_KEY = "$env:USERPROFILE\Downloads\Francis\ubuntu-ky.pem"
$APP_NAME = "valt-lms"
$REMOTE_DIR = "/var/www/valt-lms"

Write-Host "🚀 Starting LMS Deployment..." -ForegroundColor Cyan

# Check if SSH key exists
if (-not (Test-Path $SSH_KEY)) {
    Write-Host "❌ SSH key not found at: $SSH_KEY" -ForegroundColor Red
    exit 1
}

# Build the application
Write-Host "📦 Building application..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "🔐 Setting SSH key permissions..." -ForegroundColor Blue
icacls $SSH_KEY /inheritance:r
icacls $SSH_KEY /grant:r "$env:USERNAME:(R)"

# Create remote setup script
$remoteSetup = @'
# Create directories
sudo mkdir -p /var/www/valt-lms
sudo chown -R ubuntu:ubuntu /var/www/valt-lms

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install PM2 globally if not present
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    sudo npm install -g pm2
fi

# Install nginx if not present
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    sudo apt-get update
    sudo apt-get install -y nginx
fi
'@

Write-Host "📁 Setting up remote server..." -ForegroundColor Blue
$remoteSetup | ssh -i $SSH_KEY -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "bash -s"

# Upload files using scp (recursive)
Write-Host "📤 Uploading application files..." -ForegroundColor Blue

# Create a list of files to exclude
$excludes = @(".git", "node_modules", ".next", "dist", ".env.local")

# Use scp to upload (you might need to install OpenSSH client on Windows)
Write-Host "Uploading package.json..." -ForegroundColor Gray
scp -i $SSH_KEY -o StrictHostKeyChecking=no "package.json" "${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/"
scp -i $SSH_KEY -o StrictHostKeyChecking=no "package-lock.json" "${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/"

Write-Host "Uploading source files..." -ForegroundColor Gray
scp -i $SSH_KEY -o StrictHostKeyChecking=no -r "src" "${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/"
scp -i $SSH_KEY -o StrictHostKeyChecking=no -r "public" "${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/"

Write-Host "Uploading configuration files..." -ForegroundColor Gray
scp -i $SSH_KEY -o StrictHostKeyChecking=no "next.config.js" "${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/"
scp -i $SSH_KEY -o StrictHostKeyChecking=no "tsconfig.json" "${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/"
scp -i $SSH_KEY -o StrictHostKeyChecking=no "tailwind.config.ts" "${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/"
scp -i $SSH_KEY -o StrictHostKeyChecking=no "postcss.config.js" "${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/"

# Install dependencies and start the app
$remoteCommands = @'
cd /var/www/valt-lms
npm install --production
npm run build

# Stop existing process if running
pm2 delete valt-lms 2>/dev/null || true

# Start the application
pm2 start npm --name "valt-lms" -- start
pm2 save

# Setup PM2 to start on boot
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu
'@

Write-Host "📦 Installing dependencies and starting application..." -ForegroundColor Blue
$remoteCommands | ssh -i $SSH_KEY -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "bash -s"

# Configure Nginx
$nginxConfig = @'
sudo tee /etc/nginx/sites-available/valt-lms > /dev/null << 'NGINXCONF'
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
NGINXCONF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/valt-lms /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl enable nginx
'@

Write-Host "🌐 Configuring Nginx..." -ForegroundColor Blue
$nginxConfig | ssh -i $SSH_KEY -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" "bash -s"

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌍 Your application is now available at:" -ForegroundColor Cyan
Write-Host "   http://lms.valtara.ai" -ForegroundColor Green
Write-Host "   http://188.245.43.183" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Useful commands:" -ForegroundColor Cyan
Write-Host "   View logs: ssh -i $SSH_KEY ubuntu@$SERVER_IP 'pm2 logs valt-lms'" -ForegroundColor Gray
Write-Host "   Restart app: ssh -i $SSH_KEY ubuntu@$SERVER_IP 'pm2 restart valt-lms'" -ForegroundColor Gray
Write-Host "   Check status: ssh -i $SSH_KEY ubuntu@$SERVER_IP 'pm2 status'" -ForegroundColor Gray
