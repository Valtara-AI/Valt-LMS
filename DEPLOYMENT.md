# Valt LMS Deployment Guide

## Server Information
- **Domain**: lms.valtara.ai
- **IP**: 188.245.43.183
- **SSH Key**: ubuntu-ky.pem
- **User**: ubuntu

## Deployment Options

### Option 1: PowerShell (Recommended for Windows)

```powershell
# Navigate to project directory
cd d:\LMS

# Run deployment script
.\deploy.ps1
```

### Option 2: Git Bash / WSL

```bash
# Navigate to project directory
cd /d/LMS

# Make script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### Option 3: Manual Deployment

If automated scripts don't work, follow these steps:

#### 1. Build Locally
```bash
npm run build
```

#### 2. Connect to Server
```bash
ssh -i "C:\Users\SHIVAM\Downloads\Francis\ubuntu-ky.pem" ubuntu@188.245.43.183
```

#### 3. Setup Server (First Time Only)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt-get update
sudo apt-get install -y nginx

# Create app directory
sudo mkdir -p /var/www/valt-lms
sudo chown -R ubuntu:ubuntu /var/www/valt-lms
```

#### 4. Upload Files
Use WinSCP, FileZilla, or rsync to upload:
- `package.json`
- `package-lock.json`
- `src/` folder
- `public/` folder
- `next.config.js`
- `tsconfig.json`
- `tailwind.config.ts`
- `postcss.config.js`

Upload to: `/var/www/valt-lms/`

#### 5. Install & Start on Server
```bash
cd /var/www/valt-lms
npm install --production
npm run build

# Start with PM2
pm2 delete valt-lms 2>/dev/null || true
pm2 start npm --name "valt-lms" -- start
pm2 save
pm2 startup
```

#### 6. Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/valt-lms
```

Paste this configuration:
```nginx
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
```

Enable the site:
```bash
sudo ln -sf /etc/nginx/sites-available/valt-lms /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## Post-Deployment

### Access Your Application
- http://lms.valtara.ai
- http://188.245.43.183

### Useful Commands

**View application logs:**
```bash
ssh -i "C:\Users\SHIVAM\Downloads\Francis\ubuntu-ky.pem" ubuntu@188.245.43.183 "pm2 logs valt-lms"
```

**Restart application:**
```bash
ssh -i "C:\Users\SHIVAM\Downloads\Francis\ubuntu-ky.pem" ubuntu@188.245.43.183 "pm2 restart valt-lms"
```

**Check application status:**
```bash
ssh -i "C:\Users\SHIVAM\Downloads\Francis\ubuntu-ky.pem" ubuntu@188.245.43.183 "pm2 status"
```

**Stop application:**
```bash
ssh -i "C:\Users\SHIVAM\Downloads\Francis\ubuntu-ky.pem" ubuntu@188.245.43.183 "pm2 stop valt-lms"
```

**Check Nginx status:**
```bash
ssh -i "C:\Users\SHIVAM\Downloads\Francis\ubuntu-ky.pem" ubuntu@188.245.43.183 "sudo systemctl status nginx"
```

## SSL/HTTPS Setup (Optional but Recommended)

```bash
# Install Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d lms.valtara.ai

# Auto-renewal is configured automatically
```

## Environment Variables

Create `.env.production` on the server:
```bash
cd /var/www/valt-lms
nano .env.production
```

Add your production environment variables:
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://lms.valtara.ai
# Add other environment variables as needed
```

Then restart the app:
```bash
pm2 restart valt-lms
```

## Troubleshooting

### Application won't start
```bash
# Check PM2 logs
pm2 logs valt-lms

# Check if port 3000 is in use
sudo lsof -i :3000

# Restart PM2
pm2 restart valt-lms
```

### Nginx issues
```bash
# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### DNS not resolving
- Ensure your DNS A record for `lms.valtara.ai` points to `188.245.43.183`
- Wait for DNS propagation (can take up to 48 hours)
- Test with: `nslookup lms.valtara.ai`

## Update Deployment

To deploy updates:
```powershell
# Build locally
npm run build

# Run deployment script
.\deploy.ps1
```

Or manually:
1. Upload changed files to server
2. SSH into server
3. Run: `cd /var/www/valt-lms && npm run build && pm2 restart valt-lms`
