package com.clinicapp.service;

import com.clinicapp.model.views.PacientView;
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

    public List<PacientView> getAll() {
        return pacientViewRepository.getAllProc();
    }

    public PacientView getById(int id) {
        return pacientViewRepository.getByIdProc(id);
    }

    public void save(PacientView pacientAdresa) {
        pacientViewRepository.saveProc(pacientAdresa);
    }

    public void delete(int id) {
        pacientViewRepository.deleteProc(id);
    }

    public void update(PacientView pacientAdresa) {
        pacientViewRepository.updateProc(pacientAdresa);
    }

}
