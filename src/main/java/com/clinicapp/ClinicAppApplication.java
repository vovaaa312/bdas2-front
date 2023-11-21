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

        List<Pacient> list = pacientRepository.getAll();
        System.out.println(list);
    }
}
