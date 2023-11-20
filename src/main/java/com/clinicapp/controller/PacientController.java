package com.clinicapp.controller;

import com.clinicapp.model.Pacient;
import com.clinicapp.repository.PacientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api/v1/pacienti")
public class PacientController {

    @Autowired
    private PacientRepository pacientRepository;

    @GetMapping
    public List<Pacient> getAllPacients(){
        return pacientRepository.findAll();
    }
}
