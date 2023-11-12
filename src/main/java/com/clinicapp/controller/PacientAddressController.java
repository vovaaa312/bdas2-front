package com.clinicapp.controller;

import com.clinicapp.model.views.PacientAdresa;
import com.clinicapp.service.PacientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class PacientAddressController {
    private PacientService pacientAddressService;

    @Autowired
    public PacientAddressController(PacientService pacientAddressService) {
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

    @PostMapping("/savePacient")
    public String savePacient(@ModelAttribute("pacientAdresa") PacientAdresa pacientAdresa) {
        pacientAddressService.save(pacientAdresa);
        return "redirect:/pacienti"; // Используйте редирект для предотвращения дублирования запросов при обновлении страницы
    }

}
