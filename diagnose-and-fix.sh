#!/bin/bash
# Diagnostic and Fix Script for Valt LMS

echo "=== Valt LMS Diagnostic and Fix ==="
echo ""

# 1. Check if directory exists
echo "Step 1: Checking application directory..."
if [ -d "/var/www/valt-lms" ]; then
    echo "✓ Directory exists"
    cd /var/www/valt-lms
    ls -la
else
    echo "✗ Directory does not exist!"
    exit 1
fi
echo ""

# 2. Check if .next build exists
echo "Step 2: Checking if build exists..."
if [ -d ".next" ]; then
    echo "✓ Build directory exists"
    ls -la .next/
else
    echo "✗ Build directory missing - running build..."
    npm run build
fi
echo ""

# 3. Check PM2 status
echo "Step 3: Checking PM2 status..."
pm2 list
echo ""

# 4. Check for any Node processes
echo "Step 4: Checking for Node processes..."
ps aux | grep node | grep -v grep
echo ""

# 5. Kill any existing PM2 processes
echo "Step 5: Cleaning up PM2 processes..."
pm2 delete all || true
pm2 kill || true
echo ""

# 6. Start fresh PM2 daemon
echo "Step 6: Starting PM2 daemon..."
pm2 resurrect || true
echo ""

# 7. Start the application
echo "Step 7: Starting application with PM2..."
cd /var/www/valt-lms
pm2 start npm --name "valt-lms" -- start
pm2 save
echo ""

# 8. Wait for app to start
echo "Step 8: Waiting for application to start..."
sleep 5
echo ""

# 9. Check if app is running
echo "Step 9: Verifying application..."
pm2 list
echo ""
pm2 logs valt-lms --lines 20 --nostream
echo ""

# 10. Test local connection
echo "Step 10: Testing local connection..."
curl -I http://localhost:3000 2>&1 | head -10
echo ""

# 11. Check ports
echo "Step 11: Checking active ports..."
ss -tlnp | grep ':3000'
echo ""

# 12. Check Nginx status
echo "Step 12: Checking Nginx status..."
systemctl status nginx --no-pager | head -15
echo ""

# 13. Test Nginx
echo "Step 13: Testing Nginx..."
curl -I http://localhost 2>&1 | head -10
echo ""

# 14. Restart Nginx
echo "Step 14: Restarting Nginx..."
systemctl restart nginx
echo "✓ Nginx restarted"
echo ""

# 15. Final verification
echo "Step 15: Final verification..."
echo "--- PM2 Status ---"
pm2 status
echo ""
echo "--- Port Status ---"
ss -tlnp | grep ':80\|:443\|:3000'
echo ""
echo "--- Test Application ---"
curl -I http://localhost:3000 2>&1 | head -5
echo ""
echo "--- Test Nginx ---"
curl -I http://localhost 2>&1 | head -5
echo ""

echo "=== Diagnostic Complete ==="
echo ""
echo "If you see HTTP responses above, the application is working!"
echo "Try accessing: http://lms.valtara.ai"
echo ""
