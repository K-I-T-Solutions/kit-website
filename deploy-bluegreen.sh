#!/bin/bash
# Blue-Green Deployment Script for Zero Downtime
# This deploys to the inactive instance and switches traffic after successful deployment

set +e  # Don't exit on errors

echo "🚀 Starting Blue-Green deployment..."

cd /srv/kit-website

# Pull latest changes
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# Function to check if a container is healthy
check_health() {
    local container=$1
    local max_attempts=30
    local attempt=0

    echo "🏥 Checking health of $container..."

    while [ $attempt -lt $max_attempts ]; do
        if docker exec $container wget --no-verbose --tries=1 --spider http://localhost:3000 2>/dev/null; then
            echo "✅ $container is healthy!"
            return 0
        fi

        attempt=$((attempt + 1))
        echo "⏳ Waiting for $container to be ready ($attempt/$max_attempts)..."
        sleep 2
    done

    echo "❌ $container failed health check after $max_attempts attempts"
    return 1
}

# Determine which instance is currently active
BLUE_STATUS=$(docker inspect -f '{{.State.Status}}' kit-website-blue 2>/dev/null || echo "not_found")
GREEN_STATUS=$(docker inspect -f '{{.State.Status}}' kit-website-green 2>/dev/null || echo "not_found")

echo "📊 Current status: Blue=$BLUE_STATUS, Green=$GREEN_STATUS"

# Determine target instance (the one we'll update)
if [ "$BLUE_STATUS" == "running" ] && [ "$GREEN_STATUS" != "running" ]; then
    TARGET="green"
    ACTIVE="blue"
elif [ "$GREEN_STATUS" == "running" ] && [ "$BLUE_STATUS" != "running" ]; then
    TARGET="blue"
    ACTIVE="green"
else
    # Both or neither running - default to updating green
    TARGET="green"
    ACTIVE="blue"
fi

echo "🎯 Target instance: $TARGET (will update)"
echo "🟢 Active instance: $ACTIVE (currently serving traffic)"

# Build the target instance
echo "🔨 Building $TARGET instance..."
docker compose -f docker-compose.prod.yml build kit-website-$TARGET

# Stop the target instance if it's running
if docker ps -q -f name=kit-website-$TARGET 2>/dev/null | grep -q .; then
    echo "🛑 Stopping old $TARGET instance..."
    docker compose -f docker-compose.prod.yml stop kit-website-$TARGET
    docker compose -f docker-compose.prod.yml rm -f kit-website-$TARGET
fi

# Start the target instance
echo "▶️  Starting $TARGET instance..."
docker compose -f docker-compose.prod.yml up -d kit-website-$TARGET

# Wait for the target instance to be healthy
if check_health "kit-website-$TARGET"; then
    echo "✅ $TARGET instance is healthy and ready!"

    # Optional: Stop the old active instance to save resources
    # Uncomment if you want true blue-green (only one running at a time)
    # echo "🛑 Stopping old $ACTIVE instance..."
    # docker compose -f docker-compose.prod.yml stop kit-website-$ACTIVE

    echo "🎉 Deployment successful! Traffic is now being served by both instances."
    echo "📊 Caddy will automatically route traffic to healthy instances."
else
    echo "❌ Deployment failed! $TARGET instance is not healthy."
    echo "🔄 Keeping $ACTIVE instance running."
    docker compose -f docker-compose.prod.yml stop kit-website-$TARGET
    exit 1
fi

# Show final status
echo ""
echo "📊 Final container status:"
docker compose -f docker-compose.prod.yml ps

echo ""
echo "🎉 Blue-Green deployment complete!"
