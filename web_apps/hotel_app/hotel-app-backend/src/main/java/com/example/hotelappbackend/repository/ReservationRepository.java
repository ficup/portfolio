package com.example.hotelappbackend.repository;

import com.example.hotelappbackend.domain.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ReservationRepository
        extends JpaRepository<Reservation, Integer>, PagingAndSortingRepository<Reservation, Integer> {

    Page<Reservation> findAllByUserId(Pageable pageable, Integer user_id);
}
