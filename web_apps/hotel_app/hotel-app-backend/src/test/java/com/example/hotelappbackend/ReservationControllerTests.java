package com.example.hotelappbackend;
import com.example.hotelappbackend.controllers.ReservationController;
import com.example.hotelappbackend.domain.Reservation;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class ReservationControllerTests {

    @Autowired
    private ReservationController reservationController;
    @Autowired
    private MockMvc mockMvc;

    @Test
    void reservationControllerExists() throws Exception{
        assertThat(reservationController).isNotNull();
    }

    @Test
    void reservationGetEndpointsWork() throws Exception{
        this.mockMvc.perform(get("/reservations")).andExpect(status().isOk());
        this.mockMvc.perform(get("/reservations?user_id=1")).andExpect(status().isOk());
    }

    @Test
    void reservationPostEndpointsWork() throws Exception{
        Reservation testReservation = new Reservation();
        testReservation.setCheckin_date(new Date());
        testReservation.setCheckout_date(new Date());
        ObjectMapper Obj = new ObjectMapper();
        String ContentAsJsonStr = Obj.writeValueAsString(testReservation);
        this.mockMvc.perform(post("/reservation" )
                .contentType(MediaType.APPLICATION_JSON)
                .content(ContentAsJsonStr)
        ).andExpect(status().isOk());
    }

    @Test
    void reservationDeleteEndpointsWork() throws Exception{
        this.mockMvc.perform(delete("/reservation/1")).andExpect(status().isOk());
    }

    @Test
    void reservationPutEndpointsWork() throws Exception{
        Reservation testReservation = new Reservation();
        testReservation.setCheckin_date(new Date());
        testReservation.setCheckout_date(new Date());
        ObjectMapper Obj = new ObjectMapper();
        String ContentAsJsonStr = Obj.writeValueAsString(testReservation);
        this.mockMvc.perform(put("/reservation/1" )
                .contentType(MediaType.APPLICATION_JSON)
                .content(ContentAsJsonStr)
        ).andExpect(status().isOk());
    }

}