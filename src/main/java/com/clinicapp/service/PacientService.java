package com.clinicapp.service;

import com.clinicapp.model.Pacient;
import com.clinicapp.model.views.PacientAdresa;
import com.clinicapp.repository.PacientAdressRepository;
import com.clinicapp.repository.PacientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PacientService {

    private PacientRepository pacientRepository;
    @Autowired
    public PacientService(PacientRepository pacientRepository) {
        this.pacientRepository = pacientRepository;
    }

    public void save(Pacient pacient){
        pacientRepository.save(pacient);
    }
    public void update(Pacient pacient){
        pacientRepository.update(pacient);
    }


}
