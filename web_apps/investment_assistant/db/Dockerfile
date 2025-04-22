# Docker image
FROM mysql:latest

# Environment variables
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=stock
ENV MYSQL_USER=stock_user
ENV MYSQL_PASSWORD=stock_password

# Init script
COPY init.sql /docker-entrypoint-initdb.d/

# Port
EXPOSE 9009
