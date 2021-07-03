package pl.danielmarczak.adb.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "properties_descriptions")
@Data
public class PropertyDescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, name = "property_description_id")
    private Long propertyDescriptionId;

    @OneToOne(mappedBy = "propertyDescription")
    @JsonIgnoreProperties("propertyDescription")
    private Property property;

    private String descriptionText;


}
