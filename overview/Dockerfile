FROM php:8.3-apache

# Install Python to generate overview data during build.
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

EXPOSE 80