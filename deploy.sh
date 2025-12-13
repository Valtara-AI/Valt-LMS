#!/bin/bash

# LMS Deployment Script
# Server: lms.valtara.ai (188.245.43.183)

set -e

echo "🚀 Starting LMS Deployment..."

# Configuration
SERVER_USER="ubuntu"
SERVER_IP="188.245.43.183"
SERVER_DOMAIN="lms.valtara.ai"
SSH_KEY="$HOME/Downloads/Francis/ubuntu-ky.pem"
APP_NAME="valt-lms"
REMOTE_DIR="/var/www/valt-lms"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}📦 Building application...${NC}"
npm run build

echo -e "${BLUE}🔐 Setting SSH key permissions...${NC}"
chmod 600 "$SSH_KEY"

echo -e "${BLUE}📁 Creating remote directory structure...${NC}"
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" << 'ENDSSH'
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
ENDSSH

echo -e "${BLUE}📤 Uploading application files...${NC}"
rsync -avz --exclude 'node_modules' \
    --exclude '.git' \
    --exclude '.next' \
    --exclude 'dist' \
    -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" \
    ./ "$SERVER_USER@$SERVER_IP:$REMOTE_DIR/"

echo -e "${BLUE}📦 Installing dependencies on server...${NC}"
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" << 'ENDSSH'
    cd /var/www/valt-lms
    npm install --production
    npm run build
ENDSSH

echo -e "${BLUE}⚙️ Configuring PM2...${NC}"
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" << 'ENDSSH'
    cd /var/www/valt-lms
    
    # Stop existing process if running
    pm2 delete valt-lms 2>/dev/null || true
    
    # Start the application
    pm2 start npm --name "valt-lms" -- start
    pm2 save
    
    # Setup PM2 to start on boot
    sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu
ENDSSH

echo -e "${BLUE}🌐 Configuring Nginx...${NC}"
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" << 'ENDSSH'
    # Create Nginx configuration
    sudo tee /etc/nginx/sites-available/valt-lms > /dev/null << 'EOF'
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
EOF

    # Enable the site
    sudo ln -sf /etc/nginx/sites-available/valt-lms /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Test and reload Nginx
    sudo nginx -t
    sudo systemctl reload nginx
    sudo systemctl enable nginx
ENDSSH

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${BLUE}🌍 Your application is now available at:${NC}"
echo -e "   ${GREEN}http://lms.valtara.ai${NC}"
echo -e "   ${GREEN}http://188.245.43.183${NC}"
echo ""
echo -e "${BLUE}📊 Useful commands:${NC}"
echo -e "   View logs: ssh -i $SSH_KEY ubuntu@$SERVER_IP 'pm2 logs valt-lms'"
echo -e "   Restart app: ssh -i $SSH_KEY ubuntu@$SERVER_IP 'pm2 restart valt-lms'"
echo -e "   Check status: ssh -i $SSH_KEY ubuntu@$SERVER_IP 'pm2 status'"
