@echo off
REM Script to start Docker containers with auto-seeding and auto-cleanup for Windows

echo 🚀 Starting Aureliya application...

REM Stop and remove existing containers
echo 🛑 Stopping existing containers...
docker-compose down --remove-orphans

REM Remove seed containers if they exist
echo 🧹 Cleaning up seed containers...
docker-compose rm -f seed seed_menus 2>nul

REM Build and start services (excluding seed containers initially)
echo 🔨 Building and starting services...
docker-compose up -d --build mongo

REM Wait for MongoDB to be ready
echo ⏳ Waiting for MongoDB to be ready...
:wait_mongo
docker-compose ps mongo | findstr "healthy" >nul
if %errorlevel% neq 0 (
    timeout /t 2 /nobreak >nul
    goto wait_mongo
)

REM Run seed containers and wait for completion
echo 🌱 Seeding database...
docker-compose up seed
docker-compose up seed_menus

REM Remove completed seed containers
echo 🧹 Removing seed containers...
docker-compose rm -f seed seed_menus 2>nul

REM Start main services
echo 🚀 Starting main services...
docker-compose up -d --build backend web

echo ✅ Application started successfully!
echo 📊 Backend: http://localhost:5000
echo 🌐 Frontend: http://localhost:3000
echo.
echo 💡 To view logs: docker-compose logs -f
echo 💡 To stop: docker-compose down
echo 💡 Hot reload is enabled - changes will auto-update!

pause

