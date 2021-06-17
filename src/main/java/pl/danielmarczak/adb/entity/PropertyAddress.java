package pl.danielmarczak.adb.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Table(name = "properties_addresses")
@Data
@EqualsAndHashCode(callSuper = true)
public class PropertyAddress extends AbstractEntity{

    @OneToOne(mappedBy = "propertyAddress", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Property property;
    private String street;
    private String city;
    private String country;
    private String postalCode;
    private String province;
    private String region;

}
