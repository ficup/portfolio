package com.example.hotelappbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing // TODO  - może przenieść do konfiga?
public class HotelAppBackendApplication {

    public static void main(String[] args) {

        SpringApplication.run(HotelAppBackendApplication.class, args);
    }

}