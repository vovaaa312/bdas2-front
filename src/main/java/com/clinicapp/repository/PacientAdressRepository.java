package com.clinicapp.repository;

import com.clinicapp.model.Adresa;
import com.clinicapp.model.views.PacientAdresa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.Date;

@Repository
public interface PacientAdressRepository extends JpaRepository<PacientAdresa, Integer> {
    @Procedure(procedureName = "VLOZ_PACIENTA")
    void savePacientProcedure(@Param("jmeno") String jmeno,
                              @Param("prijmeni") String prijmeni,
                              @Param("datumHospitalizace") Date datumHospitalizace,
                              @Param("datumNarozeni") Date datumNarozeni,
                              @Param("cisloTelefonu") int cisloTelefonu,
                              @Param("pohlavi") String pohlavi,
                              @Param("zeme") String zeme,
                              @Param("mesto") String mesto,
                              @Param("adresa") String adresa,
                              @Param("psc") int psc);
}