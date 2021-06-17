package pl.danielmarczak.adb.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class PropertyType extends AbstractEntity{

    @OneToOne(mappedBy = "propertyType", cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    private Property property;

    private String name;
}
