package com.clinicapp;

import com.clinicapp.model.views.PacientView;
import com.clinicapp.repository.PacientViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

import java.util.Date;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class ClinicAppApplication implements CommandLineRunner {

    @Autowired
    PacientViewRepository repo;

    public static void main(String[] args) {
        SpringApplication.run(ClinicAppApplication.class, args);
    }


    @Override
    public void run(String... args) throws Exception {
        //ZamestnanecAdresa zam = new ZamestnanecAdresa(0,"JANE","DOE",new Date(), 123,5,0, "CESKA REPUBLIKA", "PARDUBICE", "PERNEROVA 168", 53000,0, "od1");
        //System.out.println(repo.getAllProc());

        repo.updateProc(new PacientView(999,"IDIOT", "IDIOTOV", new Date(), new Date(), 123, "MUZ",242,"Italie","Rome","CCCCCCCCCCC",0));
    }
}
