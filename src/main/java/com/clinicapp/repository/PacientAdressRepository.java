package com.clinicapp.repository;

import com.clinicapp.model.views.PacientAdresa;
import org.hibernate.dialect.OracleTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.jdbc.core.simple.SimpleJdbcCallOperations;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class PacientAdressRepository {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public PacientAdressRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    public List<PacientAdresa> getAllProc() {
        String sql = "{call GET_PACIENTI_VIEW(?)}";

        // Используем SimpleJdbcCall для вызова хранимой процедуры
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("GET_PACIENTI_VIEW")
                .returningResultSet("p_cursor", BeanPropertyRowMapper.newInstance(PacientAdresa.class));

        // Вызываем процедуру и получаем результат
        Map<String, Object> result = simpleJdbcCall.execute();
        // Получаем список из результата
        List<PacientAdresa> pacientiViewList = (List<PacientAdresa>) result.get("p_cursor");

        return pacientiViewList;
    }

    public PacientAdresa getByIdProc(Integer id) {

        String sql = "{call GET_PACIENT_BY_ID(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";

        // Use SimpleJdbcCall to call the stored procedure
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("GET_PACIENT_BY_ID")
                .declareParameters(
                        new SqlParameter("p_id_pacient", Types.NUMERIC),
                        new SqlOutParameter("p_jmeno", Types.VARCHAR),
                        new SqlOutParameter("p_prijmeni", Types.VARCHAR),
                        new SqlOutParameter("p_datum_hospitalizace", Types.DATE),
                        new SqlOutParameter("p_datum_narozeni", Types.DATE),
                        new SqlOutParameter("p_cislo_telefonu", Types.NUMERIC),
                        new SqlOutParameter("p_pohlavi", Types.VARCHAR),
                        new SqlOutParameter("p_id_adresa", Types.NUMERIC),
                        new SqlOutParameter("p_zeme", Types.VARCHAR),
                        new SqlOutParameter("p_mesto", Types.VARCHAR),
                        new SqlOutParameter("p_adresa", Types.VARCHAR),
                        new SqlOutParameter("p_psc", Types.NUMERIC)
                );

        // Set the input parameters
        SqlParameterSource in = new MapSqlParameterSource().addValue("p_id_pacient", id);

        // Execute the stored procedure and get the result
        Map<String, Object> result = simpleJdbcCall.execute(in);

        // Create a PacientAdresa object from the result

        PacientAdresa pacientAdresa = new PacientAdresa();
        pacientAdresa.setIdPacient(id);
        pacientAdresa.setJmeno((String) result.get("p_jmeno"));
        pacientAdresa.setPrijmeni((String) result.get("p_prijmeni"));
        pacientAdresa.setDatumHospitalizace((Date) result.get("p_datum_hospitalizace"));
        pacientAdresa.setDatumNarozeni((Date) result.get("p_datum_narozeni"));
        pacientAdresa.setCisloTelefonu(convertToInteger(result.get("p_cislo_telefonu")));
        pacientAdresa.setPohlavi((String) result.get("p_pohlavi"));
        pacientAdresa.setIdAdresa(convertToInteger(result.get("p_id_adresa")));
        pacientAdresa.setZeme((String) result.get("p_zeme"));
        pacientAdresa.setMesto((String) result.get("p_mesto"));
        pacientAdresa.setAdresa((String) result.get("p_adresa"));
        pacientAdresa.setPsc(convertToInteger(result.get("p_psc")));

        return pacientAdresa;
    }

    private Integer convertToInteger(Object value) {
        if (value instanceof BigDecimal) {
            return ((BigDecimal) value).intValue();
        } else {
            return (Integer) value;
        }
    }



    public void saveProc(PacientAdresa pacientAdresa) {
        String sql = "CALL VLOZ_PACIENTA(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, pacientAdresa.getJmeno(), pacientAdresa.getPrijmeni(),
                pacientAdresa.getDatumHospitalizace(), pacientAdresa.getDatumNarozeni(),
                pacientAdresa.getCisloTelefonu(), pacientAdresa.getPohlavi(),
                pacientAdresa.getZeme(), pacientAdresa.getMesto(),
                pacientAdresa.getAdresa(), pacientAdresa.getPsc());
    }

    public void updateProc(PacientAdresa pacientAdresa) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("UPDATE_PACIENT");

        MapSqlParameterSource in = new MapSqlParameterSource()
                .addValue("p_id_pacient", pacientAdresa.getIdPacient())
                .addValue("p_adresa_id_adresa", pacientAdresa.getIdAdresa())
                .addValue("p_jmeno", pacientAdresa.getJmeno())
                .addValue("p_prijmeni", pacientAdresa.getPrijmeni())
                .addValue("p_datum_hospitalizace", pacientAdresa.getDatumHospitalizace())
                .addValue("p_datum_narozeni", pacientAdresa.getDatumNarozeni())
                .addValue("p_cislo_telefonu", pacientAdresa.getCisloTelefonu())
                .addValue("p_pohlavi", pacientAdresa.getPohlavi());

        simpleJdbcCall.execute(in);
    }


    public void deleteProc(Integer id) {
        // Используем SimpleJdbcCall для вызова хранимой процедуры
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("ODEBER_PACIENTA");

        // Подготавливаем параметры для вызова процедуры
        SqlParameterSource in = new MapSqlParameterSource().addValue("p_id_pacient", id);

        // Вызываем процедуру
        simpleJdbcCall.execute(in);
    }



}