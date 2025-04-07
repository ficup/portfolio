//package com.example.hotelappbackend.Role;
//
//import com.example.hotelappbackend.domain.User;
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import org.springframework.data.annotation.CreatedDate;
//import org.springframework.data.annotation.LastModifiedDate;
//import org.springframework.data.jpa.domain.support.AuditingEntityListener;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@Builder
//@Entity
//@EntityListeners(AuditingEntityListener.class)
//public class Role {
//
//    @Id
//    @GeneratedValue
//    private Integer id;
//    @Column(unique = true)
//    private String name;
//
//    @ManyToMany(mappedBy = "roles")
//    @JsonIgnore
//    private List<User> users;
//
//    @CreatedDate
//    @Column(nullable = false, updatable = false)
//    private LocalDateTime createdData;
//    @LastModifiedDate
//    @Column(insertable = false)
//    private LocalDateTime lastModifiedDate;
//
//}
