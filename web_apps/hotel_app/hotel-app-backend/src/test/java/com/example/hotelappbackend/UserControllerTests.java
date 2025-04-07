package com.example.hotelappbackend;
import com.example.hotelappbackend.controllers.UserController;
import com.example.hotelappbackend.domain.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class UserControllerTests {

    @Autowired
    private UserController userController;
    @Autowired
    private MockMvc mockMvc;

    @Test
    void userControllerExists() throws Exception{
        assertThat(userController).isNotNull();
    }

    @Test
    void userGetEndpointsWork() throws Exception{
        this.mockMvc.perform(get("/users")).andExpect(status().isOk());
    }

    @Test
    void userPostEndpointsWork() throws Exception{
        User testUser = new User();
        testUser.setUser_name("a");
        testUser.setUser_email("a");
        testUser.setUser_phone("a");
        testUser.setUser_password("a");
        ObjectMapper Obj = new ObjectMapper();
        String ContentAsJsonStr = Obj.writeValueAsString(testUser);
        this.mockMvc.perform(post("/user" )
                .contentType(MediaType.APPLICATION_JSON)
                .content(ContentAsJsonStr)
        ).andExpect(status().isOk());
    }

    @Test
    void userDeleteEndpointsWork() throws Exception{
        this.mockMvc.perform(delete("/user/1")).andExpect(status().isOk());
    }

    @Test
    void userPutEndpointsWork() throws Exception{
        User testUser = new User();
        testUser.setUser_name("a");
        testUser.setUser_email("a");
        testUser.setUser_phone("a");
        testUser.setUser_password("a");
        ObjectMapper Obj = new ObjectMapper();
        String ContentAsJsonStr = Obj.writeValueAsString(testUser);
        this.mockMvc.perform(put("/user/1" )
                .contentType(MediaType.APPLICATION_JSON)
                .content(ContentAsJsonStr)
        ).andExpect(status().isOk());
    }
}