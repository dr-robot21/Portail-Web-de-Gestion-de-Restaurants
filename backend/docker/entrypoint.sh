#!/bin/sh
set -e

# Railway injects $PORT (default 8000) and health-checks that port.
# Bind nginx to it so the healthcheck and public traffic can reach us.
PORT="${PORT:-8000}"
sed -i "s/listen 80;/listen ${PORT};/" /etc/nginx/http.d/default.conf
echo "nginx configured to listen on port ${PORT}"

# Validate the nginx config before booting (fail fast with a clear log).
nginx -t

# Start nginx + php-fpm IMMEDIATELY so the healthcheck can succeed while
# the app finishes warming up in the background.
exec /usr/bin/supervisord -c /etc/supervisord.conf
