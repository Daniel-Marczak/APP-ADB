package pl.danielmarczak.adb.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "properties_descriptions")
@Data
@EqualsAndHashCode(callSuper = true)
public class PropertyDescription extends AbstractEntity{

    @OneToOne(mappedBy = "propertyDescription")
    @JsonIgnoreProperties("propertyDescription")
    private Property property;

    private String descriptionText;


}
