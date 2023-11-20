package com.clinicapp;

import com.clinicapp.model.Pacient;
import com.clinicapp.repository.PacientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Date;
import java.util.List;

@SpringBootApplication
public class ClinicAppApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(ClinicAppApplication.class, args);
    }

    @Autowired
    private PacientRepository pacientRepository;
    @Override
    public void run(String... args) throws Exception {
        Pacient p = new Pacient(61,"IVAN","PETROV", new Date(), new Date(),123,"muz");
        p = null;        //pacientRepository.save(p);
        p = pacientRepository.findById(80131);

        List<Pacient > list = pacientRepository.findAll();
        System.out.println(list);
    }
}
