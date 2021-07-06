package pl.danielmarczak.adb.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "users")
@Data
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

//    @NotBlank(message = "{validation.error-username-fmt}")
//    @NotNull(message = "{validation.error-username-fmt}")
    @Column(unique = true)
    private String username;

    private String email;

    private String contactNumber;

    private String password;

    @OneToOne
    @JoinColumn(name = "fk_role_id")
    private Role role;

    private boolean isEnabled;


}
