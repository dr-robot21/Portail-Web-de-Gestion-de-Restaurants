# ─────────────────────────────────────────────────────────────
# Stage 1: Dependencies (composer)
# ─────────────────────────────────────────────────────────────
FROM composer:2 AS composer
WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-interaction --prefer-dist --optimize-autoloader

# ─────────────────────────────────────────────────────────────
# Stage 2: Runtime (php-fpm + nginx)
# ─────────────────────────────────────────────────────────────
FROM php:8.4-fpm-alpine AS runtime

# PHP extensions required by Laravel
RUN apk add --no-cache \
        nginx \
        supervisor \
        zip \
        libzip-dev \
        icu-dev \
        libxml2-dev \
        freetype-dev \
        libjpeg-turbo-dev \
        libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" \
        pdo_mysql \
        mysqli \
        gd \
        zip \
        intl \
        bcmath \
        opcache \
        exif

# Copy composer binary from the composer image
COPY --from=composer /usr/bin/composer /usr/local/bin/composer

# Copy installed dependencies from stage 1
WORKDIR /var/www/html
COPY --from=composer /app/vendor ./vendor

# Copy application source
COPY . .

# Regenerate autoloader + app discovery inside the runtime container
RUN composer dump-autoload --no-dev --optimize \
    && php artisan package:discover --ansi \
    || true

# Create storage directory structure with correct ownership
# php-fpm (www-data) needs write access to storage + bootstrap/cache.
RUN mkdir -p \
        storage/app/public \
        storage/framework/cache/data \
        storage/framework/sessions \
        storage/framework/views \
        storage/logs \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache \
    && chown www-data:www-data public

# Copy nginx + supervisor configs
COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisord.conf
COPY docker/php.ini /usr/local/etc/php/conf.d/app.ini

# Entrypoint: start nginx + php-fpm immediately
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
# Prep: migrate + caches, run in background by supervisord
COPY docker/prep.sh /usr/local/bin/prep.sh
RUN chmod +x /usr/local/bin/entrypoint.sh /usr/local/bin/prep.sh

EXPOSE 80

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
