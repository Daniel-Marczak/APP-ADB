package pl.danielmarczak.adb.entity;

import lombok.Data;

import javax.persistence.*;


@Entity
@Table(name = "properties_types")
@Data
public class PropertyType {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, name = "property_type_id")
    private Long propertyTypeId;

    private String propertyTypeName;
}
