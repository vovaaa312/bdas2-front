package com.clinicapp.repository;

import com.clinicapp.model.Adresa;
import com.clinicapp.model.Pacient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AddressRepository {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public AddressRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    public List<Adresa> getAll() {
        return jdbcTemplate.query("SELECT * from ADRESY", BeanPropertyRowMapper.newInstance(Adresa.class));
    }

    public Adresa getById(Integer id) {
        String sql = "SELECT * FROM ADRESY WHERE ID_ADRESA = ?";
        // Используем BeanPropertyRowMapper для маппинга результата на объект Adresa
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new BeanPropertyRowMapper<>(Adresa.class));
    }

    public void save(Adresa adresa) {
        String sql = "INSERT INTO ST64550.PACIENTI " + "(ID_ADRESA, PSC, ADRESA, MESTO, ZEME) " + "VALUES (ADRESY_ID_SEQ.nextval, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, adresa.getIdAdresa(), adresa.getPsc(), adresa.getAdresa(), adresa.getMesto(), adresa.getZeme());
    }

    public void update(Adresa adresa) {
        String sql = "UPDATE ADRESY SET PSC=?, ADRESA=?, MESTO=?, ZEME=? WHERE ID_ADRESA=?";
        jdbcTemplate.update(sql, adresa.getPsc(), adresa.getPsc(), adresa.getAdresa(), adresa.getMesto(), adresa.getZeme(), adresa.getIdAdresa());
    }

    public void deleteById(Integer id) {
        String sql = "DELETE FROM ADRSY WHERE ID_ADRESA=?";
        jdbcTemplate.update(sql,id);
    }
}