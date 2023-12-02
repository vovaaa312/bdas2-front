package com.clinicapp.model.views;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "pacienti")
public class ZamestnanecAdresa {
    @Id
    @Column(name = "ID_ZAMESTNANEC")
    private int idZamestnanec;

    @Column(name = "JMENO")
    private String jmeno;

    @Column(name = "PRIJMENI")
    private String prijmeni;

    @Column(name = "DATUM_NAROZENI")
    private Date datumNarozeni;

    @Column(name = "CISLO_TELEFONU")
    private int cisloTelefonu;

    @Column(name = "PRACOVNI_ZKUSENOSTI")
    private Integer pracovniZkusenosti;

    @Column(name = "ID_ADRESA")
    private int idAdresa;

    @Column(name = "ZEME")
    private String zeme;

    @Column(name = "MESTO")
    private String mesto;

    @Column(name = "ADRESA")
    private String adresa;

    @Column(name = "PSC")
    private Integer psc;

    @Column(name = "NAZEV_ODDELENI")
    private String nazevOddeleni;


}
