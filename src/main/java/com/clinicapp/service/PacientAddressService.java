package com.clinicapp.service;

import com.clinicapp.model.Pacient;
import com.clinicapp.model.views.PacientAdresa;
import com.clinicapp.repository.PacientAdressRepository;
import com.clinicapp.repository.PacientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacientAddressService {

    PacientRepository pacientRepository;

    @Autowired
    public PacientAddressService(PacientRepository pacientAdressRepository) {
        this.pacientRepository = pacientAdressRepository;
    }

    public List<Pacient> findAll(){
        return pacientRepository.findAll();
    }

    public Pacient getById(int id){
        return pacientRepository.findById(id);
    }

    public void save(PacientAdresa pacientAdresa){
        pacientRepository.savePacientProcedure(
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
