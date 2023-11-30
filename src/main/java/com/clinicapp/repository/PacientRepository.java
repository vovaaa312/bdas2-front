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


    public void save(Pacient pacient) {
        String sql = "INSERT INTO ST64550.PACIENTI " +
                "(ID_PACIENT, ADRESY_ID_ADRESA, JMENO, PRIJMENI, DATUM_HOSPITALIZACE, DATUM_NAROZENI, CISLO_TELEFONU, POHLAVI) " +
                "VALUES (PACIENTI_ID_SEQ.nextval, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, pacient.getAdresyIdAdresa(),
                pacient.getJmeno(), pacient.getPrijmeni(),
                pacient.getDatumHospitalizace(), pacient.getDatumNarozeni(),
                pacient.getCisloTelefonu(), pacient.getPohlavi());
    }


    public void update(Pacient pacient) {
        jdbcTemplate.update("UPDATE PACIENTI SET ADRESY_ID_ADRESA=?, JMENO=?, PRIJMENI=?, DATUM_HOSPITALIZACE=?, DATUM_NAROZENI=?, CISLO_TELEFONU=?, POHLAVI=? WHERE ID_PACIENT=?",
                pacient.getAdresyIdAdresa(), pacient.getJmeno(), pacient.getPrijmeni(), pacient.getDatumHospitalizace(), pacient.getDatumNarozeni(), pacient.getCisloTelefonu(), pacient.getPohlavi(), pacient.getIdPacient());
    }

    public Pacient getById(Integer id) {
        String sql = "SELECT * FROM PACIENTI WHERE ID_PACIENT = ?";

        // Используем BeanPropertyRowMapper для маппинга результата на объект Pacient
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new BeanPropertyRowMapper<>(Pacient.class));

//        try {
//            SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
//                    .withProcedureName("GET_PACIENT_BY_ID")
//                    .declareParameters(
//                            new SqlParameter("p_id_pacient", Types.INTEGER),
//                            new SqlOutParameter("p_cursor", OracleTypes.CURSOR, new BeanPropertyRowMapper<>(Pacient.class))
//                    );
//
//            Map<String, Object> inParams = new HashMap<>();
//            inParams.put("p_id_pacient", id);
//
//            Map<String, Object> outParams = jdbcCall.execute(inParams);
//
//            List<Pacient> pacientList = (List<Pacient>) outParams.get("p_cursor");
//
//            if (pacientList != null && !pacientList.isEmpty()) {
//                return pacientList.get(0);
//            } else {
//                return null;
//            }
//        } catch (DataAccessException e) {
//            return null;
//        }
    }


//    public void deleteById(Integer id) {
//         jdbcTemplate.update("DELETE FROM PACIENTI WHERE id=?", id);
//    }

    public void deleteById(Integer id) {
        String sql = "DELETE FROM PACIENTI WHERE ID_PACIENT=?";
        jdbcTemplate.update(sql,id);
    }


    public List<Pacient> getAll() {
        return jdbcTemplate.query("SELECT * from PACIENTI",
                BeanPropertyRowMapper.newInstance(Pacient.class));
    }

    public List<Pacient> getByJmeno(String jmeno){
        return jdbcTemplate.query("SELECT * from PACIENTI WHERE jmeno=?",
                BeanPropertyRowMapper.newInstance(Pacient.class), jmeno);
    }
    public List<Pacient> getByPrijmeni(String prijmeni){
        return jdbcTemplate.query("SELECT * from PACIENTI WHERE prijmeni=?",
                BeanPropertyRowMapper.newInstance(Pacient.class), prijmeni);
    }

    public List<Pacient> getByCisloTelefonu(Integer cisloTelefonu){
        return jdbcTemplate.query("SELECT * from PACIENTI WHERE cislo_telefonu=?",
                BeanPropertyRowMapper.newInstance(Pacient.class), cisloTelefonu);
    }

}

