FROM php:7.2-fpm-stretch

RUN apt-get update

RUN apt-get install --no-install-recommends -y gnupg2
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

RUN npm install -g @vue/cli
RUN npm install -g @vue/cli-service-global

RUN mkdir -p /var/www/awr
