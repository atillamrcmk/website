#!/bin/bash

# ============================================
# Deploy Script for atillamercimek.com
# Astro Static Site Deployment
# ============================================

set -e  # Exit on any error

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
SITE_DIR="/var/www/atillamercimek"
REPO_DIR="$SITE_DIR/repo"
BUILD_DIR="$SITE_DIR/build"
BACKUP_DIR="$SITE_DIR/backup"
SITE_DOMAIN="atillamercimek.com"

# Ensure running as non-root user with sudo privileges
if [ "$EUID" -eq 0 ]; then 
   echo -e "${RED}❌ Do not run this script as root. Use a user with sudo privileges.${NC}"
   exit 1
fi

echo -e "${GREEN}🚀 Starting deployment for $SITE_DOMAIN${NC}"
echo "================================================"

# Step 1: Navigate to repo directory
echo -e "${YELLOW}📂 Navigating to repository...${NC}"
cd "$REPO_DIR" || { echo -e "${RED}❌ Repository directory not found!${NC}"; exit 1; }

# Step 2: Backup current build (if exists)
if [ -d "$BUILD_DIR" ]; then
    echo -e "${YELLOW}💾 Creating backup of current build...${NC}"
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    mkdir -p "$BACKUP_DIR"
    cp -r "$BUILD_DIR" "$BACKUP_DIR/build_$TIMESTAMP"
    # Keep only last 5 backups
    ls -dt "$BACKUP_DIR"/build_* | tail -n +6 | xargs rm -rf 2>/dev/null || true
    echo -e "${GREEN}✅ Backup created: build_$TIMESTAMP${NC}"
fi

# Step 3: Pull latest code
echo -e "${YELLOW}📥 Pulling latest code from GitHub...${NC}"
git fetch origin
git reset --hard origin/main  # Force pull (WARNING: discards local changes)

# Step 4: Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci --production=false  # Clean install for reproducibility

# Step 5: Build the project
echo -e "${YELLOW}🔨 Building project...${NC}"
npm run build

# Step 6: Deploy build to production directory
echo -e "${YELLOW}🚀 Deploying build to production...${NC}"
# Remove old build directory
rm -rf "$BUILD_DIR"
# Copy new build
cp -r "$REPO_DIR/dist" "$BUILD_DIR"

# Step 7: Set correct permissions
echo -e "${YELLOW}🔒 Setting file permissions...${NC}"
sudo chown -R www-data:www-data "$BUILD_DIR"
sudo chmod -R 755 "$BUILD_DIR"

# Step 8: Reload Nginx
echo -e "${YELLOW}🔄 Reloading Nginx...${NC}"
sudo nginx -t && sudo systemctl reload nginx || {
    echo -e "${RED}❌ Nginx configuration test failed!${NC}"
    echo -e "${YELLOW}🔄 Restoring from backup...${NC}"
    if [ -d "$BACKUP_DIR/build_$TIMESTAMP" ]; then
        rm -rf "$BUILD_DIR"
        cp -r "$BACKUP_DIR/build_$TIMESTAMP" "$BUILD_DIR"
        sudo chown -R www-data:www-data "$BUILD_DIR"
        sudo systemctl reload nginx
        echo -e "${GREEN}✅ Rolled back to previous version${NC}"
    fi
    exit 1
}

# Success
echo "================================================"
echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Site: https://$SITE_DOMAIN${NC}"
echo -e "${GREEN}📅 Deployed at: $(date)${NC}"
echo "================================================"

# Optional: Show deployed version
if [ -f "$REPO_DIR/package.json" ]; then
    VERSION=$(grep '"version"' "$REPO_DIR/package.json" | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[:space:]')
    echo -e "${GREEN}📦 Version: $VERSION${NC}"
fi

