FROM node:18.20.3 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build --prod


FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf.template

RUN dos2unix /etc/nginx/conf.d/default.conf.template

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
RUN rm -rf /etc/nginx/conf.d/default.conf

RUN chmod -R u+rw /usr/share/nginx/html/

## copy over the artifacts in dist folder to default nginx public folder
COPY  --from=build ./www /usr/share/nginx/html

RUN chmod a+x /etc/nginx/conf.d/default.conf.template

WORKDIR /
CMD sh -c "envsubst \"`env | awk -F = '{printf \" \\\\$%s\", $1}'`\" < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
