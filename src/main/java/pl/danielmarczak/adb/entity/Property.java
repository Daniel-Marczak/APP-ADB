package pl.danielmarczak.adb.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "properties")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
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

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_room_id")
    private List<PropertyRoom> propertyRooms;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_photo_id")
    private PropertyPhoto propertyPhoto;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_calendar_id")
    private PropertyCalendar propertyCalendar;

    private Boolean isAvailable;


}
