package com.clinicapp.repository;

import com.clinicapp.model.views.PacientView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class PacientViewRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<PacientView> getAllProc() {
        String sql = "{call GET_PACIENTI_VIEW(?)}";

        // Используем SimpleJdbcCall для вызова хранимой процедуры
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("GET_PACIENTI_VIEW")
                .returningResultSet("p_cursor", BeanPropertyRowMapper.newInstance(PacientView.class));

        // Вызываем процедуру и получаем результат
        Map<String, Object> result = simpleJdbcCall.execute();
        // Получаем список из результата
        List<PacientView> pacientiViewList = (List<PacientView>) result.get("p_cursor");

        return pacientiViewList;
    }

    public PacientView getByIdProc(Integer id) {
        String sql = "SELECT * FROM PACIENTI_VIEW WHERE ID_PACIENT = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new BeanPropertyRowMapper<>(PacientView.class));
    }


    public void saveProc(PacientView pacientAdresa) {
        String sql = "CALL VLOZ_PACIENTA(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, pacientAdresa.getJmeno(), pacientAdresa.getPrijmeni(),
                pacientAdresa.getDatumHospitalizace(), pacientAdresa.getDatumNarozeni(),
                pacientAdresa.getCisloTelefonu(), pacientAdresa.getPohlavi(),
                pacientAdresa.getZeme(), pacientAdresa.getMesto(),
                pacientAdresa.getAdresa(), pacientAdresa.getPsc());
    }

    public void updateProc(PacientView pacientAdresa) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("UPDATE_PACIENT");

        MapSqlParameterSource in = new MapSqlParameterSource()
                .addValue("p_id_pacient", pacientAdresa.getIdPacient())
                .addValue("p_jmeno", pacientAdresa.getJmeno())
                .addValue("p_prijmeni", pacientAdresa.getPrijmeni())
                .addValue("p_datum_hospitalizace", pacientAdresa.getDatumHospitalizace())
                .addValue("p_datum_narozeni", pacientAdresa.getDatumNarozeni())
                .addValue("p_cislo_telefonu", pacientAdresa.getCisloTelefonu())
                .addValue("p_pohlavi", pacientAdresa.getPohlavi())
                .addValue("p_id_adresa", pacientAdresa.getIdAdresa())
                .addValue("p_zeme", pacientAdresa.getZeme())
                .addValue("p_mesto", pacientAdresa.getMesto())
                .addValue("p_adresa", pacientAdresa.getAdresa())

                .addValue("p_psc", pacientAdresa.getPsc());

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