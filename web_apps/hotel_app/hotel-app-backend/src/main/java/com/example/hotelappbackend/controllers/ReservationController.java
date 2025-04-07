package com.example.hotelappbackend.controllers;

import com.example.hotelappbackend.domain.Reservation;
import com.example.hotelappbackend.repository.ReservationRepository;
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
public class ReservationController {
    private final ReservationRepository reservationRepository;

    public ReservationController(ReservationRepository reservationRepository){
        this.reservationRepository = reservationRepository;
    }

    @GetMapping(path = "/reservations")
    public ResponseEntity<Page<Reservation>> getAllReservations(final Pageable pageable, @PathVariable("id")@RequestParam(required = false) Integer id,
                                                                @PathVariable("user_id")@RequestParam(required = false) Integer user_id) {
        if(user_id != null)
            return new ResponseEntity<Page<Reservation>>(reservationRepository.findAllByUserId(pageable, user_id), HttpStatus.OK);
        else
            return new ResponseEntity<Page<Reservation>>(reservationRepository.findAll(pageable), HttpStatus.OK);
    }

    @PostMapping(path="/reservation")
    public Reservation postNewReservation(@RequestBody Reservation newReservation){
        Date checkin_date = newReservation.getCheckin_date();
        Date checkout_date = newReservation.getCheckout_date();
        Integer room_id = newReservation.getRoom_id();
        boolean date_is_valid = true;
        for (Reservation reservation: reservationRepository.findAll()
             ) {
            if(Objects.equals(room_id, reservation.getRoom_id())){
                if( !(!checkout_date.after(reservation.getCheckin_date()) && checkin_date.before(checkout_date))
                        && !(!checkin_date.before(reservation.getCheckout_date()) && checkin_date.before(checkout_date)) )
//                if( (checkin_date.after(reservation.getCheckin_date()) && checkin_date.before( reservation.getCheckout_date() )) ||
//                        (!checkout_date.before(reservation.getCheckin_date()) && checkout_date.before( reservation.getCheckout_date())) )
                    date_is_valid = false;
            }

        }
        if(date_is_valid)
            return reservationRepository.save(newReservation);
        else
            return null;
    }

    @DeleteMapping(path = "/reservation/{id}")
    void deleteReservation(@PathVariable Integer id){
        reservationRepository.deleteById(id);
    }

    @PutMapping(path = "/reservation/{id}")
    public Reservation updateReservation(@RequestBody Reservation newReservation) {
        Date checkin_date = newReservation.getCheckin_date();
        Date checkout_date = newReservation.getCheckout_date();
        Integer room_id = newReservation.getRoom_id();
        boolean date_is_valid = true;
        for (Reservation reservation : reservationRepository.findAll()
        ) {
            if (Objects.equals(room_id, reservation.getRoom_id())) {
                if (!(!checkout_date.after(reservation.getCheckin_date()) && checkin_date.before(checkout_date))
                        && !(!checkin_date.before(reservation.getCheckout_date()) && checkin_date.before(checkout_date)))
//                if( (checkin_date.after(reservation.getCheckin_date()) && checkin_date.before( reservation.getCheckout_date() )) ||
//                        (!checkout_date.before(reservation.getCheckin_date()) && checkout_date.before( reservation.getCheckout_date())) )
                    date_is_valid = false;
            }

        }
        if (date_is_valid)
            return reservationRepository.save(newReservation);
        else
            return null;
    }

}
