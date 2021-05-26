package pl.danielmarczak.adb.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "{validation.error-username-fmt}")
    @NotNull(message = "{validation.error-username-fmt}")
    @Column(unique = true)
    String username;

    @NotBlank
    @NotNull
    String email;

    @NotBlank
    @NotNull
    String password;


}
