#!/bin/sh

# Runs after nginx + php-fpm are already serving, so it must never block boot.

# Wait for the database to become reachable (up to 30s), only if configured.
if [ -n "${DB_HOST}" ] && [ -n "${DB_PORT}" ]; then
    echo "[prep] Waiting for database ${DB_HOST}:${DB_PORT}..."
    i=0
    until php -r "
        \$h = getenv('DB_HOST'); \$p = getenv('DB_PORT');
        \$c = @fsockopen(\$h, (int)\$p, \$e, \$e, 2);
        exit(\$c ? 0 : 1);
    " 2>/dev/null; do
        i=$((i + 1))
        if [ "$i" -ge 15 ]; then
            echo "[prep] Database not reachable after 30s. Continuing anyway..."
            break
        fi
        sleep 2
    done
fi

# Prepare the app (failures here must not take the container down).
php artisan migrate --force --no-interaction > /proc/1/fd/1 2>&1 || echo "[prep] migrate failed (continuing)" > /proc/1/fd/1
php artisan storage:link --force > /proc/1/fd/1 2>&1 || true
php artisan config:cache --no-interaction > /proc/1/fd/1 2>&1 || true
php artisan route:cache --no-interaction > /proc/1/fd/1 2>&1 || true

echo "[prep] app preparation finished"
