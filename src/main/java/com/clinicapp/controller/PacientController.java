package com.clinicapp.controller;

import com.clinicapp.model.Pacient;
import com.clinicapp.service.PacientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = {"http://localhost:5173"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/pacienti")
public class PacientController {

    @Autowired
    private PacientService pacientService;


    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<Pacient>> getAllPacients() {
        return ResponseEntity.ok(pacientService.getAll());
    }

    @PostMapping
    public void createPacient(@RequestBody Pacient pacient) {
         pacientService.save(pacient);
    }


    @GetMapping("{id}")
    public ResponseEntity<Pacient> getPacientById(@PathVariable Integer id){
       Pacient pacient=   pacientService.getById(id);
        return ResponseEntity.ok(pacient);
    }
    @PutMapping("{id}")
    public ResponseEntity<Pacient> updatePacient(@PathVariable int id, @RequestBody Pacient pacient) {
        pacientService.update(pacient);
        return ResponseEntity.ok(pacient);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deletePacient(@PathVariable int id){
        //pacientService.getById(id);
        pacientService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

}
