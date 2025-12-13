#!/bin/bash
# Post-Deployment Configuration Script for Valt LMS
# This script completes the recommended next steps after initial deployment

echo "=== Valt LMS Post-Deployment Configuration ==="
echo ""

# 1. Verify current deployment status
echo "Step 1: Verifying deployment status..."
pm2 status
echo ""
systemctl status nginx --no-pager | head -20
echo ""
curl -I http://localhost:3000 2>&1 | head -10
echo ""

# 2. Install Certbot for SSL
echo "Step 2: Installing Certbot for SSL certificates..."
apt update -qq
apt install -y certbot python3-certbot-nginx
echo "✓ Certbot installed"
echo ""

# 3. Setup SSL certificate
echo "Step 3: Setting up SSL certificate for lms.valtara.ai..."
certbot --nginx -d lms.valtara.ai --non-interactive --agree-tos --register-unsafely-without-email
if [ $? -eq 0 ]; then
    echo "✓ SSL certificate installed successfully"
else
    echo "⚠ SSL certificate setup failed - check if domain DNS is properly configured"
fi
echo ""

# 4. Configure PM2 startup
echo "Step 4: Configuring PM2 to start on system boot..."
pm2 startup systemd -u root --hp /root
pm2 save
echo "✓ PM2 startup configured"
echo ""

# 5. Configure firewall
echo "Step 5: Configuring firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
ufw status
echo "✓ Firewall configured"
echo ""

# 6. Final verification
echo "Step 6: Final verification..."
echo "--- PM2 Status ---"
pm2 list
echo ""
echo "--- Active Ports ---"
ss -tlnp | grep ':80\|:443\|:3000'
echo ""
echo "--- Testing HTTP Response ---"
curl -I http://localhost:3000 2>&1 | head -5
echo ""
echo "--- Testing Nginx Response ---"
curl -I http://localhost 2>&1 | head -5
echo ""

echo "=== Post-Deployment Configuration Complete ==="
echo ""
echo "Next steps:"
echo "1. Test HTTP: http://lms.valtara.ai"
echo "2. Test HTTPS: https://lms.valtara.ai (if SSL was successful)"
echo "3. Monitor logs: pm2 logs valt-lms"
echo ""
