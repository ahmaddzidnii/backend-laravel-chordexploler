FROM dunglas/frankenphp
 
RUN install-php-extensions \
    pcntl \
    posix \
    sockets \
    opcache \
    pdo_mysql \
    pdo_pgsql \
    bcmath \
    intl \
    exif \
    gd \
    zip
    # Add other PHP extensions here...
 
COPY . /app
 
ENTRYPOINT ["php", "artisan", "octane:frankenphp"]