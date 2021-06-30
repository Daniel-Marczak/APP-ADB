package pl.danielmarczak.adb.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "events")
@Data
@EqualsAndHashCode(callSuper = true)
public class Event extends AbstractEntity{

}
