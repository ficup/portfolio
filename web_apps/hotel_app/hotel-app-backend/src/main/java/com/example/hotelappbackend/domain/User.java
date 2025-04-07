package com.example.hotelappbackend.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="users")
@EntityListeners(AuditingEntityListener.class)
//public class User implements UserDetails, Principal {
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String user_name;
    @Column(unique = true)
    private String user_email;
    private String user_password;
    private String user_phone;

//    private boolean accountLocked;
//    private boolean enabled;
//
//    @ManyToMany(fetch = FetchType.EAGER)
//     private List<Role> roles;
//
//
//    @CreatedDate
//    @Column(nullable = false, updatable = false)
//    private LocalDateTime createdData;
//    @LastModifiedDate
//    @Column(insertable = false)
//    private LocalDateTime lastModifiedDate;
//
//    @Override
//    public String getName() {
//        return user_name;
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return this.roles
//                .stream()
//                .;
//    }
//
//    @Override
//    public String getPassword() {
//        return user_password;
//    }
//
//    @Override
//    public String getUsername() {
//        return user_name;
//    }
//
//    public String getEmail() {
//        return user_email;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return !accountLocked;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return enabled;
//    }
}