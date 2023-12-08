package com.clinicapp.model.views;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "ZAMESTNANCI_VIEW")
public class ZamestnanecView {
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
    private Integer cisloTelefonu;

    @Column(name = "PRACOVNI_ZKUSENOSTI")
    private Integer pracovniZkusenosti;

    @Column(name = "ID_ADRESA")
    private Integer idAdresa;

    @Column(name = "ZEME")
    private String zeme;

    @Column(name = "MESTO")
    private String mesto;

    @Column(name = "ADRESA")
    private String adresa;

    @Column(name = "PSC")
    private Integer psc;

    @Column(name = "ID_ODDELENI")
    private Integer idOddeleni;

    @Column(name = "NAZEV_ODDELENI")
    private String nazevOddeleni;

    public static ZamestnanecView mapRow(ResultSet rs, int rowNum) throws SQLException {
        ZamestnanecView zamestnanecAdresa = new ZamestnanecView();
        zamestnanecAdresa.setIdZamestnanec(rs.getInt("ID_ZAMESTNANEC"));
        zamestnanecAdresa.setJmeno(rs.getString("JMENO"));
        zamestnanecAdresa.setPrijmeni(rs.getString("PRIJMENI"));
        zamestnanecAdresa.setDatumNarozeni(rs.getDate("DATUM_NAROZENI"));
        zamestnanecAdresa.setCisloTelefonu(rs.getInt("CISLO_TELEFONU"));
        zamestnanecAdresa.setPracovniZkusenosti(rs.getInt("PRACOVNI_ZKUSENOSTI"));
        zamestnanecAdresa.setIdAdresa(rs.getInt("ID_ADRESA"));
        zamestnanecAdresa.setZeme(rs.getString("ZEME"));
        zamestnanecAdresa.setMesto(rs.getString("MESTO"));
        zamestnanecAdresa.setAdresa(rs.getString("ADRESA"));
        zamestnanecAdresa.setPsc(rs.getInt("PSC"));
        zamestnanecAdresa.setIdOddeleni(rs.getInt("ID_ODDELENI"));
        zamestnanecAdresa.setNazevOddeleni(rs.getString("NAZEV_ODDELENI"));

        return zamestnanecAdresa;
    }

}
