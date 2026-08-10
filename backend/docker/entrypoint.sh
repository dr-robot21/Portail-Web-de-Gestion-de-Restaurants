#!/bin/sh
set -e

# Railway injects $PORT (default 8000) and health-checks that port.
# Bind nginx to it so the healthcheck and public traffic can reach us.
PORT="${PORT:-8000}"
sed -i "s/listen 80;/listen ${PORT};/" /etc/nginx/http.d/default.conf
echo "nginx listening on port ${PORT}"

# Wait for the database to become reachable (up to 30s).
if [ -n "${DB_HOST}" ] && [ -n "${DB_PORT}" ]; then
    echo "Waiting for database ${DB_HOST}:${DB_PORT}..."
    i=0
    until php -r "
        \$h = getenv('DB_HOST'); \$p = getenv('DB_PORT');
        \$c = @fsockopen(\$h, (int)\$p, \$e, \$e, 2);
        exit(\$c ? 0 : 1);
    " 2>/dev/null; do
        i=$((i + 1))
        if [ "$i" -ge 15 ]; then
            echo "Database not reachable after 30s. Continuing anyway..."
            break
        fi
        sleep 2
    done
    echo "Database check done."
fi

# Prepare the app (failures here must not stop nginx from booting).
php artisan migrate --force --no-interaction 2>&1 || echo "migrate failed (continuing)"
php artisan storage:link --force 2>&1 || true
php artisan config:cache --no-interaction 2>&1 || true
php artisan route:cache --no-interaction 2>&1 || true

# Start nginx + php-fpm under supervisor
exec /usr/bin/supervisord -c /etc/supervisord.conf
