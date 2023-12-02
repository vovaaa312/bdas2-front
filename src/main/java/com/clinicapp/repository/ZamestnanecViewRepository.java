package com.clinicapp.repository;

import com.clinicapp.model.views.PacientAdresa;
import com.clinicapp.model.views.ZamestnanecAdresa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ZamestnanecViewRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<ZamestnanecAdresa> getAllProc(){
        String sql = "{call GET_ZAMESTNANCI_VIEW(?)}";

        // Используем SimpleJdbcCall для вызова хранимой процедуры
        SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("GET_ZAMESTNANCI_VIEW")
                .returningResultSet("p_cursor", BeanPropertyRowMapper.newInstance(ZamestnanecAdresa.class));

        // Вызываем процедуру и получаем результат
        Map<String, Object> result = simpleJdbcCall.execute();
        // Получаем список из результата
        List<ZamestnanecAdresa> zamestnanciViewList = (List<ZamestnanecAdresa>) result.get("p_cursor");

        return zamestnanciViewList;
    }

    public void createProc(ZamestnanecAdresa zamestnanecAdresa){

    }

}
