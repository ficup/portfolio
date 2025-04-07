FROM openjdk:17
VOLUME /tmp
EXPOSE 8080
COPY target/*-SNAPSHOT.jar hotel-backend.jar
ENTRYPOINT ["java","-jar","/hotel-backend.jar"]