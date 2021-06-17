package pl.danielmarczak.adb.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "properties")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Property extends AbstractEntity {

    private String name;

    @ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    @JoinColumn(name = "property_address_id") //from properties_addresses
    @OnDelete(action = OnDeleteAction.CASCADE)
    private PropertyAddress propertyAddress;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    @JoinColumn(name = "property_description_id") //from properties_descriptions
    @OnDelete(action = OnDeleteAction.CASCADE)
    private PropertyDescription propertyDescription;

    @OneToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE })
    @JoinColumn(name = "property_type_id")
    private PropertyType propertyType;

    @OneToMany(mappedBy = "property", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    private List<PropertyRoom> propertyRooms;

    private Boolean isAvailable;


}
