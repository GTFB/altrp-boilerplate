# Docker Setup for Payload CMS

## Option 1: With Init Container (Recommended)

Use the main `docker-compose.yml`:

```bash
docker-compose up -d
```

This option includes:
- `payload-init` container that waits for database readiness
- `payload` container that starts only after successful completion of the init container
- `start.sh` script that performs build and application startup

## Environment Variables

Make sure you have the following variables configured in `.env`:

```env
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_database
DATABASE_URI=postgresql://your_user:your_password@postgres:5432/your_database
PAYLOAD_SECRET=your_secret
PROJECT_DOMAIN=your-domain.com
```

## Logs

To view startup logs:

```bash
docker-compose logs -f payload
```

## Rebuilding

When changing code:

```bash
docker-compose build payload
docker-compose up -d
```
