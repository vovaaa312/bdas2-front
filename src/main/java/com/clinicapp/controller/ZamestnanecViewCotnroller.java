package com.clinicapp.controller;

import com.clinicapp.model.views.ZamestnanecView;
import com.clinicapp.service.ZamestnanecViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/zamestnanci-data")
public class ZamestnanecViewCotnroller {
    @Autowired
    private ZamestnanecViewService service;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<ZamestnanecView>> getAllZamestance() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public void createPacient(@RequestBody ZamestnanecView pacientAdresa) {
        service.save(pacientAdresa);
    }

    @GetMapping("{id}")
    public ResponseEntity<ZamestnanecView> getPacientById(@PathVariable Integer id) {
        ZamestnanecView zamestnanecAdresa = service.getById(id);
        return ResponseEntity.ok(zamestnanecAdresa);
    }

    @PutMapping("{id}")
    public ResponseEntity<ZamestnanecView> updatePacient(@PathVariable int id, @RequestBody ZamestnanecView zamestnanecAdresa) {
        service.update(zamestnanecAdresa);
        return ResponseEntity.ok(zamestnanecAdresa);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deletePacient(@PathVariable int id) {
        //pacientService.getById(id);
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
