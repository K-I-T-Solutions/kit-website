#!/bin/bash
set -e

# KIT Website Deployment Script
# This script pulls latest changes and rebuilds the containers

echo "🚀 Starting deployment..."

# Navigate to project directory
cd /srv/kit-website

# Pull latest changes
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# Rebuild and restart containers
echo "🔨 Rebuilding Docker containers..."
docker compose down
docker compose up -d --build

# Check if containers are running
echo "✅ Checking container status..."
docker compose ps

echo "🎉 Deployment complete!"
