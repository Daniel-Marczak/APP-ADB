package pl.danielmarczak.adb.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "properties_addresses")
@Data
public class PropertyAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, name = "property_address_id")
    private Long propertyAddressId;

    private String street;
    private String city;
    private String country;
    private String postalCode;
    private String province;
    private String region;

}
