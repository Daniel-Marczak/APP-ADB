package pl.danielmarczak.adb.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;



@Entity
@Table(name = "users")
@Data
@EqualsAndHashCode(callSuper = true)
public class User extends AbstractEntity{

    @NotBlank(message = "{validation.error-username-fmt}")
    @NotNull(message = "{validation.error-username-fmt}")
    @Column(unique = true)
    private String username;

    @NotBlank
    @NotNull
    private String email;

    @NotBlank
    @NotNull
    private String contactNumber;

    @NotBlank
    @NotNull
    private String password;

    @OneToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Property> properties = new ArrayList<Property>();

    private boolean isEnabled;


}
