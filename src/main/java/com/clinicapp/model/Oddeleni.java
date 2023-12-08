package com.clinicapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "oddeleni")
public class Oddeleni {
    @Id
    @Column(name = "ID_ODDELENI")
    private int idOddeleni;

    @Column(name = "NAZEV_ODDELENI")
    private String nazevOddeleni;

    public Oddeleni(String nazevOddeleni) {
        this.nazevOddeleni = nazevOddeleni;
    }
}
