package pl.danielmarczak.adb.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "properties_calendars")
@Data
public class PropertyCalendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, name = "property_calendar_id")
    private Long propertyCalendarId;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "fk_calendar_id")
    private List<Event> events = new ArrayList<>();

}
