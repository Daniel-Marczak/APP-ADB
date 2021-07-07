package pl.danielmarczak.adb.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "properties_calendars")
@Data
public class PropertyCalendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, name = "property_calendar_id")
    private Long propertyCalendarId;

}
