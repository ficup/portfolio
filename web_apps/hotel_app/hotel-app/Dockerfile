#FROM node:alpine AS builder
#WORKDIR ./src/app
#COPY . .
#RUN npm install && \
#    npm run build
#FROM nginx:alpine
#COPY --from=builder ./src/app/dist/* /usr/share/nginx/html/
#COPY /nginx.conf /etc/nginx/conf.d/default.conf

FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]
