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

# Validate config but NEVER let this block startup.
if nginx -t 2>&1; then
    echo "nginx config OK"
else
    echo "nginx config test failed (continuing anyway)"
fi

# Start nginx + php-fpm IMMEDIATELY so the healthcheck can succeed while
# the app finishes warming up in the background.
exec /usr/bin/supervisord -c /etc/supervisord.conf
