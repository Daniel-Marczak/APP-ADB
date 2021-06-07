package pl.danielmarczak.adb.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "{validation.error-username-fmt}")
    @NotNull(message = "{validation.error-username-fmt}")
    @Column(unique = true)
    private String username;

    @NotBlank
    @NotNull
    private String email;

    @NotBlank
    @NotNull
    private String password;

    private boolean enabled;

    @OneToOne
    private Role role;


}
