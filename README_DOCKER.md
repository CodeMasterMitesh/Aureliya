# Docker Setup with Hot Reload and Auto-Seeding

This setup provides hot reload for development and automatic database seeding.

## Features

- ✅ **Hot Reload**: Changes to source code automatically reload in containers
- ✅ **Auto-Seeding**: Menus and sub-menus are automatically seeded on startup
- ✅ **Auto-Cleanup**: Seed containers are automatically removed after completion

## Quick Start

### Windows
```bash
docker-start.bat
```

### Linux/Mac
```bash
chmod +x docker-start.sh
./docker-start.sh
```

### Manual Start
```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## How It Works

### Hot Reload

**Backend:**
- Uses `nodemon` to watch for file changes
- Source code is mounted as a volume
- Changes to files in `backend/src/` automatically restart the server

**Frontend:**
- Uses Next.js development mode
- Source code is mounted as a volume
- Changes to files in `web/` automatically trigger hot module replacement

### Auto-Seeding

1. When you run `docker-compose up`, seed containers automatically run
2. They wait for MongoDB to be healthy
3. They seed the database with initial data
4. After completion, they exit
5. Main services wait for seeds to complete before starting

### Removing Seed Containers

Seed containers are configured to exit after completion. To remove them:

```bash
# Remove seed containers manually
docker-compose rm -f seed seed_menus

# Or use the start script which does this automatically
```

## Development Workflow

1. **Start containers**: `docker-compose up -d --build`
2. **Make changes**: Edit files in `backend/src/` or `web/`
3. **See changes**: Containers automatically reload
4. **View logs**: `docker-compose logs -f [service-name]`

## Troubleshooting

### Changes not reflecting?

1. Check if volumes are mounted correctly:
   ```bash
   docker-compose exec backend ls -la /app/src
   docker-compose exec web ls -la /app
   ```

2. Restart the service:
   ```bash
   docker-compose restart backend
   docker-compose restart web
   ```

### Seed containers not running?

1. Check MongoDB is healthy:
   ```bash
   docker-compose ps mongo
   ```

2. Run seeds manually:
   ```bash
   docker-compose run --rm seed
   docker-compose run --rm seed_menus
   ```

### Port conflicts?

If ports 3000 or 5000 are already in use, update them in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Change host port
```

## Production Build

For production, use the regular Dockerfiles (not `.dev` versions):

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build
```

## File Structure

```
.
├── docker-compose.yml          # Main compose file with hot reload
├── docker-start.sh             # Linux/Mac startup script
├── docker-start.bat            # Windows startup script
├── backend/
│   ├── Dockerfile              # Production Dockerfile
│   ├── Dockerfile.dev          # Development Dockerfile (with nodemon)
│   └── src/                    # Source code (mounted in dev)
└── web/
    ├── Dockerfile              # Production Dockerfile
    ├── Dockerfile.dev          # Development Dockerfile (Next.js dev)
    └── pages/                  # Source code (mounted in dev)
```

## Environment Variables

Create `.env` files if needed:
- `backend/.env` - Backend environment variables
- `web/.env.local` - Frontend environment variables

## Notes

- Seed containers run every time you start the services
- They clean existing menus/sub-menus before seeding
- Source code changes are immediately reflected (no rebuild needed)
- `node_modules` are excluded from volume mounts for performance

