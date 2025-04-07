package com.example.hotelappbackend.controllers;

import com.example.hotelappbackend.domain.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.security.Principal;
import java.util.Base64;

@RestController
@CrossOrigin
public class LoginController {



    @PostMapping("/login") // !!! Oryginalnie było @RequestMapping
    public boolean login(@RequestBody org.springframework.security.core.userdetails.User user) { // !!! To jest inny user!!! Konflikt nazw
        return
                user.getUsername().equals("user") &&
                        user.getPassword().equals("password");
    }

//    public boolean login(@RequestBody User user){
//        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
//        HttpServletRequest request =null;
//            String authToken = request.getHeader("Authorization")
//                    .substring("Basic".length()).trim();
//        return user.getUser_name().equals("user") && user.getUser_password().equals("password");
//    }

    @GetMapping("/active_user")
    public Principal user(HttpServletRequest request){
        String authToken = request.getHeader("Authorization")
                .substring("Basic".length()).trim();
        return () -> new String(Base64.getDecoder()
                .decode(authToken)).split(":")[0];
    }

}
