FROM php:7.0-fpm
RUN docker-php-ext-install -j$(nproc) pdo_mysql

RUN mkdir /var/www/profile_pictures && chown -R www-data:www-data /var/www/profile_pictures
