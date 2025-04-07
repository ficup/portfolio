package com.example.hotelappbackend.controllers;

import com.example.hotelappbackend.domain.Reservation;
import com.example.hotelappbackend.domain.Room;
import com.example.hotelappbackend.repository.RoomRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Objects;

@RestController
@Transactional(Transactional.TxType.REQUIRED)
public class RoomController {
    private final RoomRepository roomRepository;

    public RoomController(final RoomRepository roomRepository){
        this.roomRepository = roomRepository;
    }

    @GetMapping(path = "/rooms")
    public ResponseEntity<Page<Room>> getAllRooms(final Pageable pageable, @PathVariable("id")@RequestParam(required = false) Integer id) {
        return new ResponseEntity<Page<Room>>(roomRepository.findAll(pageable), HttpStatus.OK);
    }

    @PostMapping(path="/room")
    public Room postNewRoom(@RequestBody Room newRoom){

        String hotel_name = newRoom.getHotel_name();
        String city = newRoom.getCity();
        String room_number = newRoom.getRoom_number();
        if(hotel_name==null || city==null || room_number == null || newRoom.getPrice_per_day()==null)
            return null;

        for (Room room: roomRepository.findAll() // data validation
        ) {
            if(room.getHotel_name().equals(hotel_name) &&
                    room.getCity().equals(city) &&
                    room.getRoom_number().equals(room_number) ){
                return null;
            }
        }
        return roomRepository.save(newRoom);
    }

    @DeleteMapping(path = "/room/{id}")
    void deleteRoom(@PathVariable Integer id){
        roomRepository.deleteById(id);
    }

    @PutMapping(path = "/room/{id}")
    Room updateRoom(@RequestBody Room newRoom, @PathVariable Integer id) {

        String hotel_name = newRoom.getHotel_name();
        String city = newRoom.getCity();
        String room_number = newRoom.getRoom_number();
        if(hotel_name==null || city==null || room_number == null || newRoom.getPrice_per_day()==null)
            return null;
        for (Room room: roomRepository.findAll() // data validation
        ) {
            if(room.getHotel_name().equals(hotel_name) &&
                    room.getCity().equals(city) &&
                    room.getRoom_number().equals(room_number) ){
                return null;
            }
        }

        return roomRepository.findById(id)
                .map(room -> {
                    room.setHotel_name(newRoom.getHotel_name());
                    room.setCity(newRoom.getCity());
                    room.setRoom_number(newRoom.getRoom_number());
                    room.setPrice_per_day(newRoom.getPrice_per_day());
                    return roomRepository.save(room);
                })
                .orElseGet(()->{
                    newRoom.setId(id);
                    return roomRepository.save(newRoom);
                });
    }
}