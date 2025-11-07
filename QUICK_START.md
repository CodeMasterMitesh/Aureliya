# Quick Start Guide

## 🚀 Starting the Application

### Option 1: Using Startup Scripts (Recommended)

**Windows:**
```bash
docker-start.bat
```

**Linux/Mac:**
```bash
chmod +x docker-start.sh
./docker-start.sh
```

### Option 2: Using Docker Compose Directly

```bash
docker-compose up -d --build
```

After seeds complete, remove seed containers:
```bash
docker-compose rm -f seed seed_menus
```

## ✨ Features

- ✅ **Hot Reload**: Changes to files automatically update in containers
- ✅ **Auto-Seeding**: Database is automatically seeded on startup
- ✅ **Auto-Cleanup**: Seed containers are removed after completion

## 📝 How It Works

1. **MongoDB** starts first
2. **Seed containers** run and populate the database
3. **Backend & Frontend** start with hot reload enabled
4. **Seed containers** are automatically removed

## 🔥 Hot Reload

- **Backend**: Changes in `backend/src/` automatically restart the server (nodemon)
- **Frontend**: Changes in `web/` automatically trigger Next.js hot module replacement

## 🧹 Manual Cleanup

If seed containers are still running:
```bash
docker-compose rm -f seed seed_menus
```

## 📊 Access

- Backend: http://localhost:5000
- Frontend: http://localhost:3000
- MongoDB: localhost:27017

## 🛑 Stopping

```bash
docker-compose down
```

## 📋 View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f web
```

