package com.clinicapp.repository;


import com.clinicapp.model.Oddeleni;
import com.clinicapp.model.Pacient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OddeleniRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void save(String nazev){
        String sql = "INSERT INTO ST64550.ODDELENI " +
                "(ID_ODDELENI, NAZEV_ODDELENI) " +
                "VALUES (ODDELENI_ID_SEQ.nextval, ?)";
        jdbcTemplate.update(sql, nazev);
    }

    public void update(Oddeleni oddeleni){
        jdbcTemplate.update("UPDATE ODDELENI SET ID_ODDELENI=?, NAZEV_ODDELENI=? WHERE ID_ODDEELNI=?",
                oddeleni.getNazevOddeleni(), oddeleni.getIdOddeleni());
    }
    public Oddeleni getById(Integer id){
        String sql = "SELECT * FROM ODDELENI WHERE ID_ODDELENI = ?";
        // Используем BeanPropertyRowMapper для маппинга результата на объект Oddeleni
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new BeanPropertyRowMapper<>(Oddeleni.class));

    }
    public Oddeleni getByNazev(String nazev){
        String sql = "SELECT * FROM ODDELENI WHERE NAZEV_ODDELENI = ?";
        // Используем BeanPropertyRowMapper для маппинга результата на объект Oddeleni
        return jdbcTemplate.queryForObject(sql, new Object[]{nazev}, new BeanPropertyRowMapper<>(Oddeleni.class));
    }

    public void deleteById(Integer id) {
        String sql = "DELETE FROM ODDELENI WHERE ID_ODDELENI=?";
        jdbcTemplate.update(sql,id);
    }

    public List<Oddeleni> getAll() {
        return jdbcTemplate.query("SELECT * from ODDELENI",
                BeanPropertyRowMapper.newInstance(Oddeleni.class));
    }
}
