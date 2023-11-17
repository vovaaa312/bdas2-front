package com.clinicapp.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "uzivatele")
public class Uzivatel {
//    ID_UZIVATEL
//            JMENO
//    HESLO
//            ROLE
//    ZAMESTNANCI_ID_ZAMESTNANEC
//            PACIENTI_ID_PACIENT

    @Id
    @Column(name = "ID_UZIVATEL")
    private int id;

    @Column(name = "ADRESY_ID_ADRESA")
    private int idAdresa;

    @Column(name = "JMENO")
    private String jmeno;
    @Column(name = "HESLO")
    private String heslo;
    @Column(name = "ROLE")
    private String role;
    @Column(name = "ZAMESTNANCI_ID_ZAMESTNANEC")
    private int zamestnanecId;
    @Column(name = "PACIENTI_ID_PACIENT")
    private int pacientId;
}
