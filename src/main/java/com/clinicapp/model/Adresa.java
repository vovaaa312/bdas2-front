package com.clinicapp.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.springframework.jdbc.core.RowMapper;

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


}

