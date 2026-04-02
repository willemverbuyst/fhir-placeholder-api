FROM php:8.3-apache

WORKDIR /var/www/html

# Install system dependencies required for zip + general tooling
RUN apt-get update && apt-get install -y \
    unzip \
    zip \
    git \
    libpq-dev \
    libzip-dev \
    && docker-php-ext-install zip pdo pdo_pgsql \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Add Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

EXPOSE 80