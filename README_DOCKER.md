# Docker Setup with Hot Reload, Seeding, and Collection Initialization

This setup provides hot reload for development, optional one-off collection initialization, and on-demand database seeding.

## Features

- ✅ Hot Reload (backend and frontend)
- ✅ Auto-Seeding (on demand via seed compose)
- ✅ Collection Initialization (one-off job to create empty MongoDB collections, optional index build)
- ✅ Auto-Cleanup (seed/init jobs exit and can be removed)

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

## Create Empty MongoDB Collections (no data import)

Run the one-off init service defined in `docker-compose.seed.yml` after Mongo is healthy:

```bash
docker-compose run --rm create_collections
```

Also build indexes defined in schemas:

```bash
docker-compose run --rm -e BUILD_INDEXES=true create_collections
```

Dry-run (no changes, just logs):

```bash
docker-compose run --rm -e DRY_RUN=true create_collections
```

Alternatively, run inside the running backend container:

```bash
docker-compose exec backend node src/scripts/createCollections.js
docker-compose exec backend sh -lc "BUILD_INDEXES=true node src/scripts/createCollections.js"
```

## How It Works

### Hot Reload

Backend:
- `nodemon` watches files; code is volume-mounted

Frontend:
- Next.js dev server with HMR; code is volume-mounted

### Auto-Seeding (on demand)

Seed jobs are defined in `docker-compose.seed.yml` and can be run when needed:

```bash
docker-compose run --rm seed
docker-compose run --rm seed_menus
```

### Collection Initialization (optional)

The `create_collections` job loads all Mongoose models and creates their collections without importing any data. If `BUILD_INDEXES=true` is set, it also builds indexes.

## Development Workflow

1. Start containers: `docker-compose up -d --build`
2. Create collections (optional): `docker-compose run --rm create_collections`
3. Make changes in `backend/src/` or `web/` and see hot reload
4. View logs: `docker-compose logs -f [service]`

## Troubleshooting

### Changes not reflecting?

```bash
docker-compose exec backend ls -la /app/src
docker-compose exec web ls -la /app
docker-compose restart backend
docker-compose restart web
```

### Seed/Init jobs not running?

```bash
docker-compose ps mongo
docker-compose run --rm create_collections
docker-compose run --rm seed
docker-compose run --rm seed_menus
```

### Collections not appearing?

```bash
docker-compose exec mongo mongosh aureliya_ecom --eval "db.getCollectionNames()"
docker-compose run --rm create_collections
docker-compose run --rm -e BUILD_INDEXES=true create_collections
```

### Port conflicts?

Adjust ports in `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Change host port
```

## Production Build

Use the production Dockerfiles (not `.dev`):

```bash
docker-compose -f docker-compose.prod.yml build
```

## File Structure

```
.
├── docker-compose.yml
├── docker-compose.seed.yml
├── docker-start.sh
├── docker-start.bat
├── backend/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── src/
└── web/
    ├── Dockerfile
    ├── Dockerfile.dev
    └── pages/
```

## Environment Variables

- `backend/.env` — Backend environment variables
- `web/.env.local` — Frontend environment variables

## Notes

- Init/seed jobs are optional; run them when needed
- Source changes reflect immediately with hot reload
- `node_modules` are not bind-mounted for performance

