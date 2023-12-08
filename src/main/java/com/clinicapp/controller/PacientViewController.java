package com.clinicapp.controller;

import com.clinicapp.model.views.PacientView;
import com.clinicapp.service.PacientViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/pacienti-data")
public class PacientViewController {

    @Autowired
    private PacientViewService service;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<PacientView>> getAllPacients() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public void createPacient(@RequestBody PacientView pacientAdresa) {
        service.save(pacientAdresa);
    }

    @GetMapping("{id}")
    public ResponseEntity<PacientView> getPacientById(@PathVariable Integer id) {
        PacientView pacientAdresa = service.getById(id);
        return ResponseEntity.ok(pacientAdresa);
    }

    @PutMapping("{id}")
    public ResponseEntity<PacientView> updatePacient(@PathVariable int id, @RequestBody PacientView pacientAdresa) {
        service.update(pacientAdresa);
        return ResponseEntity.ok(pacientAdresa);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deletePacient(@PathVariable int id) {
        //pacientService.getById(id);
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }


}
