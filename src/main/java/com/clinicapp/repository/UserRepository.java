package com.clinicapp.repository;

import com.clinicapp.model.Pacient;
import com.clinicapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void save(User user) {
        String sql = "INSERT INTO ST64550.USERS " +
                "(ID_USEER, USERNAME, PASSWORD) " +
                "VALUES (USERS_ID_SEQ.nextval, ?, ?)";
        jdbcTemplate.update(sql, user.getUsername(),
                user.getPassword());
    }

    public void update(User user) {
        jdbcTemplate.update("UPDATE USERS SET USERNAME=?, PASSWORD=? WHERE ID_USER=?",
                user.getUsername(), user.getPassword(), user.getIdUser());
    }

    public User getById(Integer id) {
        String sql = "SELECT * FROM USERS WHERE ID_USER = ?";
        // Используем BeanPropertyRowMapper для маппинга результата на объект Pacient
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new BeanPropertyRowMapper<>(User.class));
    }

    public void deleteById(Integer id) {
        String sql = "DELETE FROM USERS WHERE ID_USER=?";
        jdbcTemplate.update(sql,id);
    }


    public List<User> getAll() {
        return jdbcTemplate.query("SELECT * from USERS",
                BeanPropertyRowMapper.newInstance(User.class));
    }
}
