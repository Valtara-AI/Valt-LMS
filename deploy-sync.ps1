# LMS Deployment Sync Script
# This script syncs local files to the production server

param(
    [string]$Server = "root@lms.valtara.ai",
    [string]$RemotePath = "/var/www/valt-lms",
    [switch]$FullSync,
    [switch]$BuildOnly,
    [switch]$RestartOnly
)

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  LMS Deployment Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Files to always sync
$essentialFiles = @(
    "package.json",
    "package-lock.json",
    "next.config.js",
    "tsconfig.json",
    "tailwind.config.ts",
    "postcss.config.js",
    "ecosystem.config.json"
)

# Directories to sync for full deployment
$syncDirs = @(
    "src",
    "public",
    "prisma"
)

function Test-SSHConnection {
    Write-Host "Testing SSH connection to $Server..." -ForegroundColor Yellow
    $result = ssh -o ConnectTimeout=10 -o BatchMode=yes $Server "echo 'Connected'" 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Cannot connect to server. Please check:" -ForegroundColor Red
        Write-Host "  1. SSH key is set up correctly" -ForegroundColor Red
        Write-Host "  2. Server is reachable" -ForegroundColor Red
        Write-Host "  3. Try: ssh $Server" -ForegroundColor Red
        exit 1
    }
    Write-Host "SSH connection successful!" -ForegroundColor Green
}

function Sync-File {
    param([string]$LocalFile)
    
    if (Test-Path $LocalFile) {
        Write-Host "  Syncing $LocalFile..." -ForegroundColor Gray
        scp "$LocalFile" "${Server}:${RemotePath}/$LocalFile"
        if ($LASTEXITCODE -ne 0) {
            Write-Host "  ERROR syncing $LocalFile" -ForegroundColor Red
            return $false
        }
    } else {
        Write-Host "  Skipping $LocalFile (not found)" -ForegroundColor DarkGray
    }
    return $true
}

function Sync-Directory {
    param([string]$Dir)
    
    if (Test-Path $Dir) {
        Write-Host "  Syncing $Dir/..." -ForegroundColor Gray
        # Use scp -r for recursive copy
        scp -r "$Dir" "${Server}:${RemotePath}/"
        if ($LASTEXITCODE -ne 0) {
            Write-Host "  ERROR syncing $Dir" -ForegroundColor Red
            return $false
        }
    } else {
        Write-Host "  Skipping $Dir (not found)" -ForegroundColor DarkGray
    }
    return $true
}

function Invoke-RemoteCommand {
    param([string]$Command, [string]$Description)
    
    Write-Host "$Description..." -ForegroundColor Yellow
    ssh $Server $Command
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: $Description failed" -ForegroundColor Red
        return $false
    }
    return $true
}

# Main execution
Write-Host "Server: $Server" -ForegroundColor White
Write-Host "Remote Path: $RemotePath" -ForegroundColor White
Write-Host ""

# Test connection first
Test-SSHConnection

if ($RestartOnly) {
    Write-Host ""
    Write-Host "=== Restart Only Mode ===" -ForegroundColor Magenta
    Invoke-RemoteCommand "cd $RemotePath && pm2 restart valt-lms && pm2 logs valt-lms --lines 20" "Restarting PM2"
    exit 0
}

# Step 1: Sync essential files
Write-Host ""
Write-Host "=== Step 1: Syncing Essential Files ===" -ForegroundColor Magenta
foreach ($file in $essentialFiles) {
    Sync-File $file
}

# Step 2: Full sync if requested
if ($FullSync) {
    Write-Host ""
    Write-Host "=== Step 2: Syncing Source Directories ===" -ForegroundColor Magenta
    
    # First, backup and clear remote directories
    Write-Host "  Preparing remote directories..." -ForegroundColor Gray
    ssh $Server "cd $RemotePath && rm -rf src.bak public.bak prisma.bak 2>/dev/null; mv src src.bak 2>/dev/null; mv public public.bak 2>/dev/null; mv prisma prisma.bak 2>/dev/null; echo 'Directories backed up'"
    
    foreach ($dir in $syncDirs) {
        Sync-Directory $dir
    }
}

if ($BuildOnly) {
    Write-Host ""
    Write-Host "=== Files Synced (Build Only Mode) ===" -ForegroundColor Green
    Write-Host "Run the following on the server to complete deployment:" -ForegroundColor Yellow
    Write-Host "  cd $RemotePath" -ForegroundColor White
    Write-Host "  npm install" -ForegroundColor White
    Write-Host "  npm run build" -ForegroundColor White
    Write-Host "  pm2 restart valt-lms" -ForegroundColor White
    exit 0
}

# Step 3: Install dependencies and build
Write-Host ""
Write-Host "=== Step 3: Installing Dependencies ===" -ForegroundColor Magenta
Invoke-RemoteCommand "cd $RemotePath && npm install" "Installing npm packages"

Write-Host ""
Write-Host "=== Step 4: Building Application ===" -ForegroundColor Magenta
Invoke-RemoteCommand "cd $RemotePath && npm run build" "Building Next.js application"

# Step 5: Restart PM2
Write-Host ""
Write-Host "=== Step 5: Restarting Application ===" -ForegroundColor Magenta
Invoke-RemoteCommand "cd $RemotePath && pm2 restart valt-lms" "Restarting PM2 process"

# Step 6: Verify
Write-Host ""
Write-Host "=== Step 6: Verification ===" -ForegroundColor Magenta
Invoke-RemoteCommand "ss -tulpn | grep 3000" "Checking if app is listening on port 3000"

Write-Host ""
Write-Host "=== Step 7: Recent Logs ===" -ForegroundColor Magenta
ssh $Server "pm2 logs valt-lms --lines 15 --nostream"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Deployment Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Check the site: https://lms.valtara.ai" -ForegroundColor Cyan
