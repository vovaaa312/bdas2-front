package com.clinicapp.controller;

import com.clinicapp.model.Oddeleni;
import com.clinicapp.service.OddeleniService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/oddeleni")
public class OddeleniController {

    @Autowired
    private OddeleniService service;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<Oddeleni>> getAllOddeleni() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public void createPacient(@RequestBody Oddeleni oddeleni) {
        service.save(oddeleni);
    }

    @GetMapping("{id}")
    public ResponseEntity<Oddeleni> getOddeleniById(@PathVariable Integer id) {
        Oddeleni oddeleni = service.getById(id);
        return ResponseEntity.ok(oddeleni);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteOddeleni(@PathVariable int id) {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
