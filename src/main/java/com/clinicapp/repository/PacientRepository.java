package com.clinicapp.repository;

import com.clinicapp.model.Pacient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PacientRepository {

    private JdbcTemplate jdbcTemplate;

    @Autowired
    public PacientRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(Pacient pacient) {
        jdbcTemplate.update("INSERT INTO PACIENTI (id, id_adresa, jmeno,prijmeni,datumHospitalizace,datumNarozeni,cisloTelefonu,pohlavi) VALUES(?,?,?,?,?,?,?,?)",
                new Object[]{pacient.getId_adresa(), pacient.getJmeno(), pacient.getPrijmeni(), pacient.getDatumHospitalizace(), pacient.getDatumNarozeni(), pacient.getCisloTelefonu(), pacient.getPohlavi()});
    }

    public void update(Pacient pacient){
        jdbcTemplate.update("UPDATE PACIENTI SET id_adresa=?, jmeno=?,prijmeni=?,datumHospitalizace=?,datumNarozeni=?,cisloTelefonu=?,pohlavi=? WHERE id=?) VALUES(?,?,?,?,?,?,?,?)",
                new Object[]{pacient.getId_adresa(), pacient.getJmeno(), pacient.getPrijmeni(), pacient.getDatumHospitalizace(), pacient.getDatumNarozeni(), pacient.getCisloTelefonu(), pacient.getPohlavi(), pacient.getId()});
    }

    public Pacient findById(Integer id) {
        try {
            Pacient pacirent = jdbcTemplate.queryForObject("SELECT * FROM PACIENTI WHERE id=?",
                    BeanPropertyRowMapper.newInstance(Pacient.class), id);

            return pacirent;
        } catch (IncorrectResultSizeDataAccessException e) {
            return null;
        }
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

