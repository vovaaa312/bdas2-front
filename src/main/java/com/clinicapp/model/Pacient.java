package com.clinicapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "pacienti")
public class Pacient {
    @Id
    @Column(name = "ID_ADRESA")
    private int id;

    @Column(name = "ADRESY_ID_ADRESA")
    private int id_adresa;

    @Column(name = "JMENO")
    private String jmeno;

    @Column(name = "PRIJMENI")
    private String prijmeni;

    @Column(name = "DATUM_HOSTPITALIZACE")
    private Date datumHospitalizace;

    @Column(name = "DATUM_NAROZENI")
    private Date datumNarozeni;

    @Column(name = "CISLO_TELEFONU")
    private int cisloTelefonu;

    @Column(name = "POHLAVI")
    private String pohlavi;


    public Pacient(int id_adresa, String jmeno, String prijmeni, Date datumHospitalizace, Date datumNarozeni, int cisloTelefonu, String pohlavi) {
        this.id_adresa = id_adresa;
        this.jmeno = jmeno;
        this.prijmeni = prijmeni;
        this.datumHospitalizace = datumHospitalizace;
        this.datumNarozeni = datumNarozeni;
        this.cisloTelefonu = cisloTelefonu;
        this.pohlavi = pohlavi;
    }
}
