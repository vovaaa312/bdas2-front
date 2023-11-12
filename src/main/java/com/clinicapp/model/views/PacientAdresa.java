package com.clinicapp.model.views;

import jakarta.persistence.*;
import lombok.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class PacientAdresa {

    private String jmeno;
    private String prijmeni;
    private Date datumHospitalizace;
    private Date datumNarozeni;
    private Integer cisloTelefonu; // Используйте Integer вместо int для обработки null значений
    private String pohlavi;
    private String zeme;
    private String mesto;
    private String adresa;
    private Integer psc;

//    public PacientAdresa getMapRow(ResultSet rs, int rowNum) throws SQLException {
//        PacientAdresa pacientAdresa = new PacientAdresa();
//        pacientAdresa.setIdPacient(rs.getInt("ID_ADRESA"));
//        pacientAdresa.setJmeno(rs.getString("JMENO"));
//        pacientAdresa.setPrijmeni(rs.getString("PRIJMENI"));
//        pacientAdresa.setDatumHospitalizace(rs.getDate("DATUM_HOSPITALIZACE"));
//        pacientAdresa.setDatumNarozeni(rs.getDate("DATUM_NAROZENI"));
//        pacientAdresa.setCisloTelefonu(rs.getInt("CISLO_TELEFONU"));
//        pacientAdresa.setPohlavi(rs.getString("POHLAVI"));
//        pacientAdresa.setZeme(rs.getString("ZEME"));
//        pacientAdresa.setMesto(rs.getString("MESTO"));
//        pacientAdresa.setAdresa(rs.getString("ADRESA"));
//        pacientAdresa.setPsc(rs.getInt("PSC"));
//
//        return pacientAdresa;
//
//
//    }
}
