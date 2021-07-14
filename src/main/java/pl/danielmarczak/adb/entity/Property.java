package pl.danielmarczak.adb.entity;

import lombok.Data;

import javax.persistence.*;


@Entity
@Table(name = "properties")
@Data
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, name = "property_id")
    private Long propertyId;

    private String propertyName;

    @ManyToOne
    @JoinColumn(name = "fk_user_id")
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_address_id")
    private PropertyAddress propertyAddress;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_description_id")
    private PropertyDescription propertyDescription;

    @ManyToOne
    @JoinColumn(name = "fk_type_id")
    private PropertyType propertyType;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_photo_id")
    private PropertyPhoto propertyPhoto;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_calendar_id")
    private PropertyCalendar propertyCalendar;

    private Boolean isAvailable;

}
