package pl.danielmarczak.adb.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("properties")
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "property_address_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnoreProperties("property")
    private PropertyAddress propertyAddress;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "description_id", referencedColumnName = "property_description_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnoreProperties("property")
    private PropertyDescription propertyDescription;

    @ManyToOne
    @JoinColumn(name = "property_type_id")
    private PropertyType propertyType;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnoreProperties("property")
    private List<PropertyRoom> propertyRooms;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "photo_id", referencedColumnName = "property_photo_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnoreProperties("property")
    private PropertyPhoto propertyPhoto;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "property_calendar_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private PropertyCalendar propertyCalendar;

    private Boolean isAvailable;


}
