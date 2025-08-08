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
npx payload migrate:create
npx payload migrate

# Check if build is needed - check for actual build files, not just directory
if [ ! -d "/app/apps/payload/.next" ] || [ ! -f "/app/apps/payload/.next/BUILD_ID" ]; then
  echo "Build directory not found or incomplete, starting build..."
  cd /app/apps/payload
  npm run build
  echo "Build completed!"
else
  echo "Build directory exists and appears complete, skipping build..."
fi

# Start the application
echo "Starting application..."
cd /app/apps/payload
npm start
