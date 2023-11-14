package com.clinicapp.service;

import com.clinicapp.model.views.PacientAdresa;
import com.clinicapp.repository.PacientAdressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacientAddressService {

    PacientAdressRepository pacientAdressRepository;

    @Autowired
    public PacientAddressService(PacientAdressRepository pacientAdressRepository) {
        this.pacientAdressRepository = pacientAdressRepository;
    }

    public List<PacientAdresa> findAll(){
        return pacientAdressRepository.findAll();
    }

    public PacientAdresa getById(int id){
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
