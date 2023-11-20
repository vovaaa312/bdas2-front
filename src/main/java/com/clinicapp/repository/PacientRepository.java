package com.clinicapp.repository;

import com.clinicapp.model.Pacient;
import org.hibernate.dialect.OracleTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.*;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.sql.Types;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

        jdbcTemplate.update(sql, pacient.getId_adresa(),pacient.getJmeno(),pacient.getPrijmeni(), pacient.getDatumHospitalizace(),
                pacient.getDatumNarozeni(),pacient.getCisloTelefonu(),pacient.getPohlavi());
    }


    public void update(Pacient pacient){
        jdbcTemplate.update("UPDATE PACIENTI SET id_adresa=?, jmeno=?,prijmeni=?,datumHospitalizace=?,datumNarozeni=?,cisloTelefonu=?,pohlavi=? WHERE id=?) VALUES(?,?,?,?,?,?,?,?)",
                new Object[]{pacient.getId_adresa(), pacient.getJmeno(), pacient.getPrijmeni(), pacient.getDatumHospitalizace(), pacient.getDatumNarozeni(), pacient.getCisloTelefonu(), pacient.getPohlavi(), pacient.getId()});
    }

    public Pacient findById(Integer id) {
        try {
            SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                    .withProcedureName("GET_PACIENT_BY_ID")
                    .declareParameters(
                            new SqlParameter("p_id_pacient", Types.INTEGER),
                            new SqlOutParameter("p_cursor", OracleTypes.CURSOR, new BeanPropertyRowMapper<>(Pacient.class))
                    );

            Map<String, Object> inParams = new HashMap<>();
            inParams.put("p_id_pacient", id);

            Map<String, Object> outParams = jdbcCall.execute(inParams);

            List<Pacient> pacientList = (List<Pacient>) outParams.get("p_cursor");

            if (pacientList != null && !pacientList.isEmpty()) {
                return pacientList.get(0);
            } else {
                return null;
            }
        } catch (DataAccessException e) {
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

