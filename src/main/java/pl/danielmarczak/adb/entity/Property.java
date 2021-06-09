package pl.danielmarczak.adb.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "property")
@Data
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private PropertyAddress address;

    @OneToOne
    private PropertyTypeOfRental typeOfRental;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "property", orphanRemoval = true)
    private List<PropertyRoom> propertyRooms;

    private String name;
    private Boolean isAvailable;
    private String description;


}