package com.example.hotelappbackend;
import com.example.hotelappbackend.controllers.RoomController;
import com.example.hotelappbackend.domain.Room;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class RoomControllerTests {

    @Autowired
    private RoomController roomController;
    @Autowired
    private MockMvc mockMvc;

    @Test
    void roomControllerExists() throws Exception{
        assertThat(roomController).isNotNull();
    }

    @Test
    void roomGetEndpointsWork() throws Exception{
        this.mockMvc.perform(get("/rooms")).andExpect(status().isOk());
    }

    @Test
    void roomPostEndpointsWork() throws Exception{
        Room testRoom = new Room();
        testRoom.setHotel_name("a");
        testRoom.setCity("a");
        testRoom.setRoom_number("a");
        testRoom.setPrice_per_day(1.0);
        ObjectMapper Obj = new ObjectMapper();
        String ContentAsJsonStr = Obj.writeValueAsString(testRoom);
        this.mockMvc.perform(post("/room" )
                .contentType(MediaType.APPLICATION_JSON)
                .content(ContentAsJsonStr)
        ).andExpect(status().isOk());
    }

    @Test
    void roomDeleteEndpointsWork() throws Exception{
        this.mockMvc.perform(delete("/room/1")).andExpect(status().isOk());
    }

    @Test
    void roomPutEndpointsWork() throws Exception{
        Room testRoom = new Room();
        testRoom.setHotel_name("a");
        testRoom.setCity("a");
        testRoom.setRoom_number("a");
        testRoom.setPrice_per_day(1.0);
        ObjectMapper Obj = new ObjectMapper();
        String ContentAsJsonStr = Obj.writeValueAsString(testRoom);
        this.mockMvc.perform(put("/room/1" )
                .contentType(MediaType.APPLICATION_JSON)
                .content(ContentAsJsonStr)
        ).andExpect(status().isOk());
    }
}