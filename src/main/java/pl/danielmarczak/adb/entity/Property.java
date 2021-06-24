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
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Property extends AbstractEntity {

    private String propertyName;

    @ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("properties")
    private User user;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    @JoinColumn(name = "property_address_id") //from properties_addresses
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnoreProperties("property")
    private PropertyAddress propertyAddress;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    @JoinColumn(name = "property_description_id") //from properties_descriptions
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnoreProperties("property")
    private PropertyDescription propertyDescription;

    @ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    @JoinColumn(name = "property_type_id")
    @JsonIgnoreProperties("property")
    private PropertyType propertyType;

    @OneToMany(mappedBy = "property", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    @JsonIgnoreProperties("property")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<PropertyRoom> propertyRooms;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    @JoinColumn(name = "properties_photos_id") //from properties_photos
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnoreProperties("property")
    private PropertyPhoto propertyPhoto;

    private Boolean isAvailable;


}
