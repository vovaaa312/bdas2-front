package com.clinicapp.repository;

import com.clinicapp.model.views.ZamestnanecView;
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
public class ZamestnanecViewRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private OddeleniRepository oddeleniRepository;

    public List<ZamestnanecView> getAllProc() {
        String sql = "{call GET_ZAMESTNANCI_VIEW(?)}";

        // Используем SimpleJdbcCall для вызова хранимой процедуры
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("GET_ZAMESTNANCI_VIEW")
                .returningResultSet("p_cursor", BeanPropertyRowMapper.newInstance(ZamestnanecView.class));

        // Вызываем процедуру и получаем результат
        Map<String, Object> result = simpleJdbcCall.execute();
        // Получаем список из результата
        List<ZamestnanecView> zamestnanciViewList = (List<ZamestnanecView>) result.get("p_cursor");

        return zamestnanciViewList;
    }

    public void saveProc(ZamestnanecView zamestnanecAdresa) {
        String sql = "CALL VLOZ_ZAMESTNANCE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                zamestnanecAdresa.getJmeno(),
                zamestnanecAdresa.getPrijmeni(),
                zamestnanecAdresa.getDatumNarozeni(),
                zamestnanecAdresa.getCisloTelefonu(),
                zamestnanecAdresa.getPracovniZkusenosti(),
                zamestnanecAdresa.getNazevOddeleni(),
                zamestnanecAdresa.getZeme(),
                zamestnanecAdresa.getMesto(),
                zamestnanecAdresa.getAdresa(),
                zamestnanecAdresa.getPsc());
    }

    public ZamestnanecView getById(Integer id) {
        String sql = "SELECT * FROM ZAMESTNANCI_VIEW WHERE ID_ZAMESTNANEC = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new BeanPropertyRowMapper<>(ZamestnanecView.class));
    }

    public void updateProc(ZamestnanecView zamestnanecAdresa) {
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("UPDATE_ZAMESTNANCE");

        MapSqlParameterSource in = new MapSqlParameterSource()
                .addValue("p_id_zamestnanec", zamestnanecAdresa.getIdZamestnanec())
                .addValue("p_jmeno", zamestnanecAdresa.getJmeno())
                .addValue("p_prijmeni", zamestnanecAdresa.getPrijmeni()).addValue("p_datum_narozeni", zamestnanecAdresa.getDatumNarozeni())
                .addValue("p_cislo_telefonu", zamestnanecAdresa.getCisloTelefonu())
                .addValue("p_pracovni_zkusenosti", zamestnanecAdresa.getPracovniZkusenosti())

                .addValue("p_id_adresa", zamestnanecAdresa.getIdAdresa())
                .addValue("p_zeme", zamestnanecAdresa.getZeme())
                .addValue("p_mesto", zamestnanecAdresa.getMesto())
                .addValue("p_adresa", zamestnanecAdresa.getAdresa())
                .addValue("p_psc", zamestnanecAdresa.getPsc())

                .addValue("p_id_oddeleni", zamestnanecAdresa.getIdOddeleni())
                .addValue("p_nazev_oddeleni", zamestnanecAdresa.getNazevOddeleni());


        simpleJdbcCall.execute(in);
    }

    public void deleteProc(Integer id){
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("ODEBER_ZAMESTNANCE");

        SqlParameterSource in = new MapSqlParameterSource().addValue("p_id_zamestnanec", id);

        simpleJdbcCall.execute(in);
    }

}
