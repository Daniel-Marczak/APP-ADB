package pl.danielmarczak.adb.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "properties_calendars")
@Data
@EqualsAndHashCode(callSuper = true)
public class PropertyCalendar extends AbstractEntity{

}
