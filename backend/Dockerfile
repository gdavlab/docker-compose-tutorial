FROM composer

ENV APP_ENV=local

RUN apk add nodejs npm

RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable pdo_mysql

WORKDIR /app

COPY . .

RUN composer install

RUN npm i

RUN npm i concurrently -g

ENV DOCKERIZE_VERSION v0.7.0

RUN apk update --no-cache \
    && apk add --no-cache wget openssl \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apk del wget

CMD dockerize -wait tcp://db:3306 -timeout 60m \
    php artisan migrate:refresh && \
    php artisan db:seed --force && \
    concurrently "npm run dev" "php artisan serve --host=0.0.0.0 --port=8000"


