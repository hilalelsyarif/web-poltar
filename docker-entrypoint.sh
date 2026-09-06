#!/bin/sh
set -e

cd /app/backend-poltar

# Migrate database tables and seed default admin & structure
php artisan migrate --force || true
php artisan db:seed --force || true

echo "Starting Polisi Taruna web server on port ${PORT:-8000}..."
exec php artisan serve --host=0.0.0.0 --port=${PORT:-8000}
