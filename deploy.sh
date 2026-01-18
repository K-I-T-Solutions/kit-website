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

# Clean up any existing containers
echo "🧹 Cleaning up existing containers..."
docker compose down --remove-orphans || true

# Remove dangling containers if any exist
echo "🗑️  Removing dangling containers..."
docker container prune -f || true

# Rebuild and restart containers
echo "🔨 Rebuilding Docker containers..."
docker compose up -d --build --force-recreate

# Wait for containers to be ready
echo "⏳ Waiting for containers to start..."
sleep 5

# Check if containers are running
echo "✅ Checking container status..."
docker compose ps

# Test if website is responding
echo "🔍 Testing website..."
if curl -f -s -o /dev/null http://localhost; then
    echo "✅ Website is responding!"
else
    echo "⚠️  Website check failed, but containers may still be starting..."
fi

echo "🎉 Deployment complete!"
