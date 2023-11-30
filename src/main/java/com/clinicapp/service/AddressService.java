package com.clinicapp.service;

import com.clinicapp.model.Adresa;
import com.clinicapp.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {

    AddressRepository addressRepository;

    @Autowired
    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }


    public List<Adresa> findAll(){
        return addressRepository.getAll();
    }

    public  Adresa getById(int id){
        return addressRepository.getById(id);
    }

}
