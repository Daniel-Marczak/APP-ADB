package pl.danielmarczak.adb.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Table(name = "property_rooms")
@Data
@EqualsAndHashCode(callSuper = true)
public class PropertyRoom extends AbstractEntity{

    @ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "property_id")
    private Property property;
}
