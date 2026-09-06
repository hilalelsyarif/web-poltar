FROM php:8.2-cli-alpine

# Install system dependencies & PHP extensions
RUN apk add --no-cache \
    sqlite-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    zip \
    unzip \
    curl \
    oniguruma-dev \
    && docker-php-ext-install pdo pdo_sqlite pdo_mysql mbstring fileinfo pcntl bcmath gd zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy backend
COPY backend-poltar /app/backend-poltar

# Install composer dependencies
RUN cd /app/backend-poltar && \
    composer install --no-dev --optimize-autoloader --no-interaction

# Copy frontend static files into Laravel public directory
COPY index.html admin.html login.html /app/backend-poltar/public/
COPY assets /app/backend-poltar/public/assets

# Copy entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Setup environment & permissions
RUN cd /app/backend-poltar && \
    mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/app/public database && \
    touch database/database.sqlite && \
    chmod -R 777 storage bootstrap/cache database && \
    php artisan storage:link || true

WORKDIR /app/backend-poltar

ENV APP_ENV=production
ENV APP_DEBUG=false
ENV APP_KEY=base64:ofDS70qPfFWqezktFDRFSn6pSuL6b4xQEXzekhZvm3U=
ENV DB_CONNECTION=sqlite
ENV PORT=8000

EXPOSE 8000

ENTRYPOINT ["/docker-entrypoint.sh"]
