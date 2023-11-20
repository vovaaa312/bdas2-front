package com.clinicapp.repository;

import com.clinicapp.model.Pacient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.*;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public class PacientRepository {

    private JdbcTemplate jdbcTemplate;

    @Autowired
    public PacientRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void savePacientProcedure(
            String jmeno, String prijmeni, Date datumHospitalizace, Date datumNarozeni,
            int cisloTelefonu, String pohlavi, String zeme, String mesto, String adresa, int psc) {

        String sql = "CALL VLOZ_PACIENTA(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        jdbcTemplate.update(sql, jmeno, prijmeni, datumHospitalizace, datumNarozeni,
                cisloTelefonu, pohlavi, zeme, mesto, adresa, psc);
    }


    public void save(Pacient pacient){
        String sql = "CALL VLOZ_P(?,?,?,?,?,?,?)";

        jdbcTemplate.update(sql, pacient.getAdresyIdAdresa(),pacient.getJmeno(),pacient.getPrijmeni(), pacient.getDatumHospitalizace(),
                pacient.getDatumNarozeni(),pacient.getCisloTelefonu(),pacient.getPohlavi());
    }


    public void update(Pacient pacient){
        jdbcTemplate.update("UPDATE PACIENTI SET id_adresa=?, jmeno=?,prijmeni=?,datumHospitalizace=?,datumNarozeni=?,cisloTelefonu=?,pohlavi=? WHERE id=?) VALUES(?,?,?,?,?,?,?,?)",
                new Object[]{pacient.getAdresyIdAdresa(), pacient.getJmeno(), pacient.getPrijmeni(), pacient.getDatumHospitalizace(), pacient.getDatumNarozeni(), pacient.getCisloTelefonu(), pacient.getPohlavi(), pacient.getIdPacient()});
    }

    public Pacient findById(Integer id) {
        String sql = "SELECT ID_PACIENT,ADRESY_ID_ADRESA,JMENO,PRIJMENI,DATUM_HOSPITALIZACE,DATUM_NAROZENI,CISLO_TELEFONU,POHLAVI FROM PACIENTI WHERE ID_PACIENT = ?";

        // Используем BeanPropertyRowMapper для маппинга результата на объект Pacient
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new BeanPropertyRowMapper<>(Pacient.class));
    }


    public void deleteById(Integer id) {
        jdbcTemplate.update("DELETE FROM PACIENTI WHERE id=?", id);
    }


    public List<Pacient> findAll() {
        return jdbcTemplate.query("SELECT * from PACIENTI",
                BeanPropertyRowMapper.newInstance(Pacient.class));
    }

    public List<Pacient> findByJmeno(String jmeno){
        return jdbcTemplate.query("SELECT * from PACIENTI WHERE jmeno=?",
                BeanPropertyRowMapper.newInstance(Pacient.class), jmeno);
    }
    public List<Pacient> findByPrijmeni(String prijmeni){
        return jdbcTemplate.query("SELECT * from PACIENTI WHERE prijmeni=?",
                BeanPropertyRowMapper.newInstance(Pacient.class), prijmeni);
    }

    public List<Pacient> findByCisloTelefonu(Integer cisloTelefonu){
        return jdbcTemplate.query("SELECT * from PACIENTI WHERE cislo_telefonu=?",
                BeanPropertyRowMapper.newInstance(Pacient.class), cisloTelefonu);
    }

}

