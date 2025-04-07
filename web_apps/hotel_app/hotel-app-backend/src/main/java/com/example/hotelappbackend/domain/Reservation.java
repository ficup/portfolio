package com.example.hotelappbackend.domain;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Date checkin_date;
    private Date checkout_date;
    private Integer user_id;
    private Integer room_id;
    // ***********************
    @ManyToOne
    @JoinColumn(name="user_id", insertable=false, updatable=false)
//    @Column(insertable=false, updatable=false)
    private User user;
    @ManyToOne
    @JoinColumn(name="room_id", insertable=false, updatable=false)
//    @Column(insertable=false, updatable=false)
    private Room room;


}