package pl.danielmarczak.adb.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Entity
@Table(name = "users")
@Data
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    //todo regex
    @NotBlank(message = "{validation.error-username-fmt}")
    @NotNull(message = "{validation.error-username-fmt}")
    @Column(unique = true)
    private String username;

    @OneToOne
    @JoinColumn(name = "fk_role_id")
    private Role role;

    @Pattern(
            regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])(?=\\S+$).{8,}$",
            message = "{validation.error-password-fmt}"
    )
    private String password;

    @Transient
    @Pattern(
            regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])(?=\\S+$).{8,}$",
            message = "{validation.error-conf-pass-fmt}"
    )
    private String confPassword;

    //todo regex
    @NotBlank(message = "{validation.error-username-fmt}")
    @NotNull(message = "{validation.error-username-fmt}")
    private String email;
    //todo regex
    private String contactNumber;

    private boolean isEnabled;


}
