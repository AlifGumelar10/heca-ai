FROM php:8.2-cli

# Ekstensi PHP untuk PostgreSQL
RUN apt-get update && apt-get install -y \
        libpq-dev unzip git \
    && docker-php-ext-install pdo pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock* ./
RUN composer install --no-interaction --no-scripts --prefer-dist || true

COPY . .
RUN composer install --no-interaction --prefer-dist

EXPOSE 8000

CMD ["sh", "-c", "php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000"]
