package pl.danielmarczak.adb.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "property")
@Data
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private PropertyAddress address;

    @OneToOne
    private PropertyTypeOfRental typeOfRental;

    @OneToMany
    private Set<PropertyRoom> propertyRooms;

    private String name;
    private Boolean isAvailable;
    private String description;


}
