#!/bin/bash
# Script to start Docker containers with auto-seeding and auto-cleanup

echo "🚀 Starting Aureliya application..."

# Stop and remove existing containers
echo "🛑 Stopping existing containers..."
docker-compose down --remove-orphans

# Remove seed containers if they exist
echo "🧹 Cleaning up seed containers..."
docker-compose rm -f seed seed_menus 2>/dev/null || true

# Build and start MongoDB first
echo "🔨 Building and starting MongoDB..."
docker-compose up -d --build mongo

# Wait for MongoDB to be ready
echo "⏳ Waiting for MongoDB to be ready..."
while ! docker-compose ps mongo | grep -q "healthy"; do
  sleep 2
done

# Run seed containers and wait for completion
echo "🌱 Seeding database..."
docker-compose up seed
docker-compose up seed_menus

# Remove completed seed containers
echo "🧹 Removing seed containers..."
docker-compose rm -f seed seed_menus 2>/dev/null || true

# Start main services
echo "🚀 Starting main services..."
docker-compose up -d --build backend web

echo "✅ Application started successfully!"
echo "📊 Backend: http://localhost:5000"
echo "🌐 Frontend: http://localhost:3000"
echo ""
echo "💡 To view logs: docker-compose logs -f"
echo "💡 To stop: docker-compose down"
echo "💡 Hot reload is enabled - changes will auto-update!"

