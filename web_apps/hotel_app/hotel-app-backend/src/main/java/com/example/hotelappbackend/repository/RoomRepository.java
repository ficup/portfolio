package com.example.hotelappbackend.repository;

import com.example.hotelappbackend.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

// CrudRepository/JpaRepository zawiera wiele przydatnych metod
public interface RoomRepository
        extends JpaRepository<Room, Integer>, PagingAndSortingRepository<Room, Integer> {

}
