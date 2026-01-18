#!/bin/bash
# Restore Script for KIT Website Backups

set -e

if [ -z "$1" ]; then
    echo "Usage: $0 <backup-file.tar.gz>"
    echo ""
    echo "Available backups:"
    ls -lh /srv/backups/kit-website/*.tar.gz 2>/dev/null || echo "No backups found"
    exit 1
fi

BACKUP_FILE="$1"
RESTORE_DIR="/srv/kit-website-restore-$(date +%Y%m%d_%H%M%S)"

echo "🔄 Starting restore from: $BACKUP_FILE"

# Verify checksum if available
if [ -f "${BACKUP_FILE}.sha256" ]; then
    echo "🔍 Verifying backup checksum..."
    sha256sum -c "${BACKUP_FILE}.sha256" || {
        echo "❌ Checksum verification failed!"
        exit 1
    }
    echo "✅ Checksum verified"
fi

# Create restore directory
mkdir -p "$RESTORE_DIR"

# Extract backup
echo "📦 Extracting backup..."
tar xzf "$BACKUP_FILE" -C "$RESTORE_DIR"

# Show metadata
echo ""
echo "📋 Backup Metadata:"
cat "$RESTORE_DIR/metadata.txt"
echo ""

read -p "Do you want to continue with the restore? (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
    echo "❌ Restore cancelled"
    rm -rf "$RESTORE_DIR"
    exit 0
fi

# Stop running containers
echo "🛑 Stopping running containers..."
cd /srv/kit-website
docker compose down || true

# Restore Git repository
echo "📦 Restoring source code..."
cd /srv/kit-website
git bundle unbundle "$RESTORE_DIR/git-repo.bundle"

# Restore environment variables
if [ -f "$RESTORE_DIR/env.backup" ]; then
    echo "🔐 Restoring environment variables..."
    cp "$RESTORE_DIR/env.backup" /srv/kit-website/.env
fi

# Restore configuration files
echo "⚙️  Restoring configuration files..."
cp "$RESTORE_DIR/Caddyfile.backup" /srv/kit-website/Caddyfile
cp "$RESTORE_DIR/docker-compose.yml.backup" /srv/kit-website/docker-compose.yml
[ -f "$RESTORE_DIR/docker-compose.prod.yml.backup" ] && cp "$RESTORE_DIR/docker-compose.prod.yml.backup" /srv/kit-website/docker-compose.prod.yml

# Restore Docker volumes
echo "💾 Restoring Docker volumes..."
docker volume create kit-website_caddy_data
docker volume create kit-website_caddy_config

docker run --rm \
    -v kit-website_caddy_data:/data \
    -v "$RESTORE_DIR":/backup \
    alpine sh -c "cd /data && tar xzf /backup/caddy_data.tar.gz"

docker run --rm \
    -v kit-website_caddy_config:/data \
    -v "$RESTORE_DIR":/backup \
    alpine sh -c "cd /data && tar xzf /backup/caddy_config.tar.gz"

# Restart containers
echo "▶️  Restarting containers..."
cd /srv/kit-website
docker compose up -d --build

# Cleanup restore directory
echo "🧹 Cleaning up..."
rm -rf "$RESTORE_DIR"

echo ""
echo "✅ Restore completed successfully!"
echo "🌐 Website should be accessible at https://kit-it-koblenz.de"
echo ""
echo "📊 Container status:"
docker compose ps
