package pl.danielmarczak.adb.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;



@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class PropertyType extends AbstractEntity{

    private String propertyType;
}
