#!/bin/sh

echo "Starting Payload application..."

# Wait for database to be ready
echo "Waiting for database to be ready..."
until pg_isready -h postgres -U $POSTGRES_USER -d $POSTGRES_DB; do
  echo "Database is not ready yet, waiting..."
  sleep 5
done

echo "Database is ready!"

# Initialize Payload CMS first (create tables, etc.)
echo "Initializing Payload CMS..."
cd /app/apps/payload
# Run migrations under Bun runtime
bun x payload migrate:create
bun x payload migrate

# Build is done during Docker build stage; skip any build here
echo "Build already present from image build stage; skipping build."

# Start the application
echo "Starting application with Bun runtime..."
cd /app/apps/payload
bun x next start
