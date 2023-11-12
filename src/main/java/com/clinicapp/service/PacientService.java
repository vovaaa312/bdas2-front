package com.clinicapp.service;

import com.clinicapp.model.Pacient;
import com.clinicapp.model.views.PacientAdresa;
import com.clinicapp.repository.PacientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacientService {

    private final PacientRepository pacientAdressRepository;

    @Autowired
    public PacientService(PacientRepository pacientAdressRepository) {
        this.pacientAdressRepository = pacientAdressRepository;
    }

    public List<Pacient> findAll(){
        return pacientAdressRepository.findAll();
    }

    public Pacient getById(int id){
        return pacientAdressRepository.getOne(id);
    }

    public void save(PacientAdresa pacientAdresa){
        pacientAdressRepository.savePacientProcedure(
                pacientAdresa.getJmeno(),
                pacientAdresa.getPrijmeni(),
                pacientAdresa.getDatumHospitalizace(),
                pacientAdresa.getDatumNarozeni(),
                pacientAdresa.getCisloTelefonu(),
                pacientAdresa.getPohlavi(),
                pacientAdresa.getZeme(),
                pacientAdresa.getMesto(),
                pacientAdresa.getAdresa(),
                pacientAdresa.getPsc()
        );    }
}
