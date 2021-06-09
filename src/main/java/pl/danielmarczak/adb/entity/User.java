package pl.danielmarczak.adb.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;


@Entity
@Table(name = "user")
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

    @OneToOne
    private Role role;

    @OneToMany(mappedBy = "user")
    private List<Property> properties;

    private boolean isEnabled;


}
