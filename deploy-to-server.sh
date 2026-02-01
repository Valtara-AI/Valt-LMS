#!/bin/bash

# Emergency deployment script for LMS
# This script will clean and redeploy the LMS from scratch

echo "🧹 Cleaning compromised installation..."
pm2 delete valt-lms 2>/dev/null || true
rm -rf /var/www/valt-lms
mkdir -p /var/www/valt-lms

echo "📦 Extracting clean build..."
cd /tmp
if [ -f lms-build.tar.gz ]; then
    tar -xzf lms-build.tar.gz -C /var/www/valt-lms
    mv /var/www/valt-lms/standalone/* /var/www/valt-lms/
    rmdir /var/www/valt-lms/standalone
else
    echo "❌ Build file not found at /tmp/lms-build.tar.gz"
    exit 1
fi

echo "🚀 Starting application..."
cd /var/www/valt-lms
pm2 start server.js --name valt-lms
pm2 save

echo "✅ Deployment complete!"
pm2 list
