package com.clinicapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "users")
public class User {
    @Id
    @Column(name = "ID_USER")
    private int idUser;

    @Column(name = "USERNAME")
    private int username;

    @Column(name = "PASSWORD")
    private int password;
}
