package com.clinicapp.controller;

import com.clinicapp.model.views.PacientAdresa;
import com.clinicapp.service.PacientAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Date;

@Controller
public class PacientAddressController {
    private PacientAddressService pacientAddressService;

    @Autowired
    public PacientAddressController(PacientAddressService pacientAddressService) {
        this.pacientAddressService = pacientAddressService;
    }

    @GetMapping("/pacienti")
    public String homePage(Model model){
        model.addAttribute("pacientiList", pacientAddressService.findAll());
        return "pacient/pacienti-list";
    }

    @GetMapping("/add-pacient-page")
    public String addPacientPage(Model model){
        PacientAdresa pacientAdresa = new PacientAdresa();
        model.addAttribute("pacientAdresa", pacientAdresa);
        return "pacient/add-pacient";
    }

    @PostMapping("/savePA")
    public String savePacient(@ModelAttribute("pacientAdresa") PacientAdresa pacientAdresa) {

//        pacientAdresa.setJmeno("PETR");
//        pacientAdresa.setPrijmeni("PETROV");
//        pacientAdresa.setDatumHospitalizace(new Date());
//        pacientAdresa.setDatumNarozeni(new Date());
//        pacientAdresa.setCisloTelefonu(123);
//        pacientAdresa.setPohlavi("MUZ");
//        pacientAdresa.setZeme("CR");
//        pacientAdresa.setMesto("QWEQWE");
//        pacientAdresa.setAdresa("AWQERWERE");
//        pacientAdresa.setPsc(12312);
//        pacientAddressService.save(pacientAdresa);
        return "redirect:/pacienti"; // Используйте редирект для предотвращения дублирования запросов при обновлении страницы
    }

}
