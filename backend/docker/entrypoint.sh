#!/bin/sh
set -e

# Railway/Render inject $PORT (e.g. 10000). Substitute it into nginx.conf so the
# public web server binds to the right port. Default to 80 for plain Docker.
if [ -n "${PORT}" ]; then
    sed -i "s/listen 80;/listen ${PORT};/" /etc/nginx/http.d/default.conf
fi

# Wait for the database to become reachable (up to 60s).
if [ -n "${DB_HOST}" ] && [ -n "${DB_PORT}" ]; then
    echo "Waiting for database ${DB_HOST}:${DB_PORT}..."
    i=0
    until php -r "
        \$h = getenv('DB_HOST'); \$p = getenv('DB_PORT');
        \$c = @fsockopen(\$h, (int)\$p, \$e, \$e, 2);
        exit(\$c ? 0 : 1);
    " 2>/dev/null; do
        i=$((i + 1))
        if [ "$i" -ge 30 ]; then
            echo "Database not reachable after 60s. Continuing anyway..."
            break
        fi
        sleep 2
    done
    echo "Database reachable."
fi

# Prepare the app
php artisan migrate --force --no-interaction 2>&1 || echo "migrate failed (continuing)"
php artisan storage:link --force 2>&1 || true
php artisan config:cache --no-interaction 2>&1 || true
php artisan route:cache --no-interaction 2>&1 || true

# Start nginx + php-fpm under supervisor
exec /usr/bin/supervisord -c /etc/supervisord.conf
