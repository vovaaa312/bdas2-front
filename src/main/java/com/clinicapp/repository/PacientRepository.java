package com.clinicapp.repository;

import com.clinicapp.model.Pacient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface PacientRepository extends JpaRepository<Pacient, Integer> {
    @Procedure(procedureName = "VLOZ_PACIENTA")
    void savePacientProcedure(@Param("jmeno") String jmeno,
                              @Param("prijmeni") String prijmeni,
                              @Param("datumHospitalizace") Date datumHospitalizace,
                              @Param("datumNarozeni") Date datumNarozeni,
                              @Param("CISLO_TELEFONU") int cisloTelefonu,
                              @Param("pohlavi") String pohlavi,
                              @Param("zeme") String zeme,
                              @Param("mesto") String mesto,
                              @Param("adresa") String adresa,
                              @Param("psc") int psc);
}