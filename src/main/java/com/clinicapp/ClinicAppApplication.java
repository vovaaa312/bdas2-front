package com.clinicapp;

import com.clinicapp.repository.PacientViewRepository;
import com.clinicapp.repository.ZamestnanecViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class ClinicAppApplication implements CommandLineRunner {

    @Autowired    ZamestnanecViewRepository repo;

    public static void main(String[] args) {
        SpringApplication.run(ClinicAppApplication.class, args);
    }



    @Override
    public void run(String... args) throws Exception {
    System.out.println(repo.getAllProc());


    }
}
