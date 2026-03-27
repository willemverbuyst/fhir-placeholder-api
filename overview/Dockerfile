FROM php:8.3-apache

WORKDIR /var/www/html

# Install Python to generate overview data during build.
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 \
  unzip \
  zip \
  git \
  libzip-dev \
  && docker-php-ext-install zip pdo pdo_mysql mysqli \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Add Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

EXPOSE 80