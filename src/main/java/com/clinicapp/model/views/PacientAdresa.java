package com.clinicapp.model.views;

import jakarta.persistence.*;
import lombok.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "pacienti_view")
public class PacientAdresa {

    @Id
    @Column(name = "ID_ADRESA")
    private int idAdresa;

    @Column(name = "JMENO")
    private String jmeno;

    @Column(name = "PRIJMENI")
    private String prijmeni;

    @Column(name = "DATUM_HOSPITALIZACE")
    private Date datumHospitalizace;

    @Column(name = "DATUM_NAROZENI")
    private Date datumNarozeni;

    @Column(name = "CISLO_TELEFONU")
    private int cisloTelefonu;

    @Column(name = "POHLAVI")
    private String pohlavi;

    @Column(name = "ZEME")
    private String zeme;

    @Column(name = "MESTO")
    private String mesto;

    @Column(name = "ADRESA")
    private String adresa;

    @Column(name = "PSC")
    private int psc;

    public PacientAdresa getMapRow(ResultSet rs, int rowNum) throws SQLException {
        PacientAdresa pacientAdresa = new PacientAdresa();
        pacientAdresa.setIdAdresa(rs.getInt("ID_ADRESA"));
        pacientAdresa.setJmeno(rs.getString("JMENO"));
        pacientAdresa.setPrijmeni(rs.getString("PRIJMENI"));
        pacientAdresa.setDatumHospitalizace(rs.getDate("DATUM_HOSPITALIZACE"));
        pacientAdresa.setDatumNarozeni(rs.getDate("DATUM_NAROZENI"));
        pacientAdresa.setCisloTelefonu(rs.getInt("CISLO_TELEFONU"));
        pacientAdresa.setPohlavi(rs.getString("POHLAVI"));
        pacientAdresa.setZeme(rs.getString("ZEME"));
        pacientAdresa.setMesto(rs.getString("MESTO"));
        pacientAdresa.setAdresa(rs.getString("ADRESA"));
        pacientAdresa.setPsc(rs.getInt("PSC"));

        return pacientAdresa;


    }
}
