package com.clinicapp.service;

import com.clinicapp.model.Oddeleni;
import com.clinicapp.repository.OddeleniRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OddeleniService {
    @Autowired
    OddeleniRepository oddeleniRepository;

    public List<Oddeleni> getAll() {
        return oddeleniRepository.getAll();
    }

    public Oddeleni getById(Integer id) {
        return oddeleniRepository.getById(id);
    }

    public void save(Oddeleni oddeleni) {
        if (oddeleni != null) oddeleniRepository.save(oddeleni.getNazevOddeleni());
    }

    public void update(Oddeleni oddeleni) {
        if (oddeleni != null) oddeleniRepository.update(oddeleni);
    }

    public void delete(Integer id) {
        oddeleniRepository.deleteById(id);
    }


}
