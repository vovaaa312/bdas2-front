package com.clinicapp.controller;

import com.clinicapp.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AddressController {

    private AddressService addressService;

    @Autowired
    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }


    @GetMapping("/")
    public String homePage(Model model){
        model.addAttribute("adresyList", addressService.findAll());
        return "adresy-list";
    }
}
