package com.clinicapp.repository;

import com.clinicapp.model.Uzivatel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UzivatelRepository {

    private JdbcTemplate jdbcTemplate;
    @Autowired
    public UzivatelRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(Uzivatel uzivatel) {
        jdbcTemplate.update("INSERT INTO UZIVATELE (ID_UZIVATEL, JMENO, HESLO,ROLE,ZAMESTNANCI_ID_ZAMESTNANEC,PACIENTI_ID_PACIENT) VALUES(?,?,?,?,?,?)",
                new Object[]{uzivatel.getId(), uzivatel.getJmeno(), uzivatel.getHeslo(), uzivatel.getRole(), uzivatel.getZamestnanecId(), uzivatel.getPacientId()});
    }
    public List<Uzivatel> getAll() {
        return jdbcTemplate.query("SELECT * from UZIVATELE",
                BeanPropertyRowMapper.newInstance(Uzivatel.class));
    }

    public List<Uzivatel> getByJmeno(String jmeno){
        return jdbcTemplate.query("SELECT * from UZIVATELE WHERE jmeno=?",
                BeanPropertyRowMapper.newInstance(Uzivatel.class), jmeno);
    }

    public Uzivatel getById(Integer id) {
        try {
            Uzivatel uzivatel = jdbcTemplate.queryForObject("SELECT * FROM UZIVATELE WHERE id=?",
                    BeanPropertyRowMapper.newInstance(Uzivatel.class), id);

            return uzivatel;
        } catch (IncorrectResultSizeDataAccessException e) {
            return null;
        }
    }
}
