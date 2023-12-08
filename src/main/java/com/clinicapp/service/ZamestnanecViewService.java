package com.clinicapp.service;

import com.clinicapp.model.views.ZamestnanecView;
import com.clinicapp.repository.ZamestnanecViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ZamestnanecViewService {

    @Autowired
    ZamestnanecViewRepository repository;

    public List<ZamestnanecView> getAll() {
        return repository.getAllProc();
    }

    public ZamestnanecView getById(Integer id) {
        return repository.getById(id);
    }

    public void save(ZamestnanecView zamestnanecAdresa) {
        repository.saveProc(zamestnanecAdresa);
    }

    public void delete(Integer id){
        repository.deleteProc(id);
    }

    public void update(ZamestnanecView zamestnanecAdresa){
        repository.updateProc(zamestnanecAdresa);
    }
}

