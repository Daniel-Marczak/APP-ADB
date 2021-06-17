package pl.danielmarczak.adb.entity;

import lombok.Data;

import javax.persistence.*;


@Entity
@Table(name = "roles")
@Data
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private int id;

    private String name;

}
