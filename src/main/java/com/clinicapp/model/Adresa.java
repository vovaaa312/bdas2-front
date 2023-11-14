package com.clinicapp.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

@Data
@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
@Table(name="adresy")
public class Adresa {
    @Id
    @Column(name = "ID_ADRESA")
    private int id;

    @Column(name = "ZEME")
    private String zeme;

    @Column(name = "MESTO")
    private String mesto;

    @Column(name = "ADRESA")
    private String adresa;

    @Column(name = "PSC")
    private int psc;

    public Adresa(String zeme, String mesto, String adresa, int psc) {
        this.zeme = zeme;
        this.mesto = mesto;
        this.adresa = adresa;
        this.psc = psc;
    }

//    public Adresa getMapRow(ResultSet rs, int rowNum) throws SQLException {
//        Adresa adresa = new Adresa();
//        adresa.setId(rs.getInt("ID_ADRESA"));
//        adresa.setZeme(rs.getString("ZEME"));
//        adresa.setMesto(rs.getString("MESTO"));
//        adresa.setAdresa(rs.getString("ADRESA"));
//        adresa.setPsc(rs.getInt("PSC"));
//    }


}

