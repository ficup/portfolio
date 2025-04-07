package com.example.hotelappbackend.controllers;

import com.example.hotelappbackend.domain.User;
import com.example.hotelappbackend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Transactional(Transactional.TxType.REQUIRED)
public class UserController {
    private final UserRepository userRepository;

    public UserController(final UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @GetMapping(path = "/users")
    public ResponseEntity<Page<User>> getAllUsers(final Pageable pageable, @PathVariable("id")@RequestParam(required = false) Integer id) {
        return new ResponseEntity<Page<User>>(userRepository.findAll(pageable), HttpStatus.OK);
    }

    @PostMapping(path="/user")
    public User postNewUser(@RequestBody User newUser){
        return userRepository.save(newUser);
    }

    @DeleteMapping(path = "/user/{id}")
    void deleteUser(@PathVariable Integer id){
        userRepository.deleteById(id);
    }

    @PutMapping(path = "/user/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Integer id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUser_name(newUser.getUser_name());
                    user.setUser_email(newUser.getUser_email());
                    user.setUser_password(newUser.getUser_password());
                    user.setUser_phone(newUser.getUser_phone());
                    return userRepository.save(user);
                })
                .orElseGet(()->{
                    newUser.setId(id);
                    return userRepository.save(newUser);
                });
    }
}
