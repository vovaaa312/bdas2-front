package com.clinicapp.repository;

import com.clinicapp.model.Adresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class AddressRepository  {


    public List<Adresa> findAll() {
        return null;
    }

    public Adresa getById(int id) {
        return null;
    }
}