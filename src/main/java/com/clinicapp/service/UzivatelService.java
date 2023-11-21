package com.clinicapp.service;

import com.clinicapp.model.Uzivatel;
import com.clinicapp.repository.UzivatelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UzivatelService {

     UzivatelRepository uzivatelRepository;

     @Autowired
    public UzivatelService(UzivatelRepository uzivatelRepository) {
        this.uzivatelRepository = uzivatelRepository;
    }

    public List<Uzivatel> findAll(){
        return uzivatelRepository.getAll();
    }

    public Uzivatel getById(int id){
        return uzivatelRepository.getById(id);
    }

    public void save(Uzivatel uzivatel){
         uzivatelRepository.save(uzivatel);
    }
}
