package pl.danielmarczak.adb.entity;

import lombok.Data;

import javax.persistence.*;

@MappedSuperclass
@Data
public abstract class AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
}
