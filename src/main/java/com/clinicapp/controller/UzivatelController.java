package com.clinicapp.controller;

import com.clinicapp.model.Uzivatel;
import com.clinicapp.model.views.PacientAdresa;
import com.clinicapp.service.UzivatelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Date;

@Controller
public class UzivatelController {

    private UzivatelService uzivatelService;


    @Autowired
    public UzivatelController(UzivatelService uzivatelService) {
        this.uzivatelService = uzivatelService;
    }

    @GetMapping("/login")
    public String homePage(Model model){
       return "auth/login";
    }

    @PostMapping("/saveUser")
    public String saveUzivatel(@ModelAttribute("uzivatel") Uzivatel uzivatel) {

        uzivatel.setId(999);

        uzivatel.setJmeno("QWERTY");
        uzivatel.setHeslo("qwerty");
        uzivatel.setRole("ADRMIN");
        uzivatel.setZamestnanecId(999);
        uzivatel.setPacientId(0);
        uzivatelService.save(uzivatel);
        return "redirect:/login"; // Используйте редирект для предотвращения дублирования запросов при обновлении страницы
    }
}
