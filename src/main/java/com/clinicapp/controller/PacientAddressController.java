package com.clinicapp.controller;

import com.clinicapp.model.views.PacientAdresa;
import com.clinicapp.service.PacientViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/pacienti-data")
public class PacientAddressController {

    @Autowired
    private PacientViewService pacientAddressService;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<PacientAdresa>> getAllPacients() {
        return ResponseEntity.ok(pacientAddressService.getAll());
    }

    @PostMapping
    public void createPacient(@RequestBody PacientAdresa pacientAdresa) {
        pacientAddressService.save(pacientAdresa);
    }

    @GetMapping("{id}")
    public ResponseEntity<PacientAdresa> getPacientById(@PathVariable Integer id) {
        PacientAdresa pacientAdresa = pacientAddressService.getById(id);
        return ResponseEntity.ok(pacientAdresa);
    }

    @PutMapping("{id}")
    public ResponseEntity<PacientAdresa> updatePacient(@PathVariable int id, @RequestBody PacientAdresa pacientAdresa) {
        pacientAddressService.update(pacientAdresa);
        return ResponseEntity.ok(pacientAdresa);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deletePacient(@PathVariable int id) {
        //pacientService.getById(id);
        pacientAddressService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }


}
