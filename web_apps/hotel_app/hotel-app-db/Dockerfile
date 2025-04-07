# Docker image
FROM postgres:latest

# Environment variables
ENV POSTGRES_ROOT_PASSWORD=root

#ENV POSTGRES_DB=hotel_db
#ENV POSTGRES_USER=hotel_admin
#ENV POSTGRES_PASSWORD=pass
ENV POSTGRES_DB=mnjcmcnl
ENV POSTGRES_USER=mnjcmcnl
ENV POSTGRES_PASSWORD=DbKrZaNMTYzYD_aAozL0NQX3KnZunhpC

# Init script
COPY init.sql /docker-entrypoint-initdb.d/

# Port
EXPOSE 7777
