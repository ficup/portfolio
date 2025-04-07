package com.example.hotelappbackend.config;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {

//    @Bean
//    public DataSource getDataSource(){
//        final DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
//        dataSourceBuilder.driverClassName("org.postgresql.Driver");
//        dataSourceBuilder.url("jdbc:postgresql://snuffleupagus.db.elephantsql.com:5432/mnjcmcnl");
//        dataSourceBuilder.username("mnjcmcnl");
//        dataSourceBuilder.password("DbKrZaNMTYzYD_aAozL0NQX3KnZunhpC");
//        return dataSourceBuilder.build();
//    }

    @Bean
    public JdbcTemplate jdbcTemplate(final DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

}
