package com.example.hotelappbackend.repository;

import com.example.hotelappbackend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserRepository
        extends JpaRepository<User, Integer>, PagingAndSortingRepository<User, Integer> {

}
