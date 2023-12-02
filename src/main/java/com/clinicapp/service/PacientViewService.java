package com.clinicapp.service;

import com.clinicapp.model.views.PacientAdresa;
import com.clinicapp.repository.PacientViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacientViewService {

    @Autowired
    PacientViewRepository pacientViewRepository;

    @Autowired
    public PacientViewService(PacientViewRepository pacientViewRepository) {
        this.pacientViewRepository = pacientViewRepository;
    }

    public List<PacientAdresa> getAll() {
        return pacientViewRepository.getAllProc();
    }

    public PacientAdresa getById(int id) {
        return pacientViewRepository.getByIdProc(id);
    }

    public void save(PacientAdresa pacientAdresa) {
        pacientViewRepository.saveProc(pacientAdresa);
    }

    public void delete(int id) {
        pacientViewRepository.deleteProc(id);
    }

    public void update(PacientAdresa pacientAdresa) {
        pacientViewRepository.updateProc(pacientAdresa);
    }

}
