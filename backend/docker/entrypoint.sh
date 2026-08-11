#!/bin/sh
set -e

# Railway injects $PORT (default 8000) and health-checks that port.
# Bind nginx to BOTH $PORT and 80 so whatever Railway checks, we answer.
PORT="${PORT:-8000}"
if [ "$PORT" != "80" ]; then
    sed -i "s/listen 80;/listen ${PORT};/" /etc/nginx/http.d/default.conf
    sed -i "/listen ${PORT};/a\    listen 80;" /etc/nginx/http.d/default.conf
fi
echo "nginx configured to listen on ports ${PORT} and 80"

# Ensure php-fpm (www-data) can write to storage at runtime.
# Build-time chown is not enough on some platforms (e.g. Railway volumes).
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache 2>/dev/null \
    || echo "warning: could not chown storage (continuing)"
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache 2>/dev/null \
    || true

# Validate config but NEVER let this block startup.
if nginx -t 2>&1; then
    echo "nginx config OK"
else
    echo "nginx config test failed (continuing anyway)"
fi

# Start nginx + php-fpm IMMEDIATELY so the healthcheck can succeed while
# the app finishes warming up in the background.
exec /usr/bin/supervisord -c /etc/supervisord.conf
