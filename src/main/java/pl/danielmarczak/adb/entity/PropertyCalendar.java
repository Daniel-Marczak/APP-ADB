package pl.danielmarczak.adb.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "properties_calendars")
@Data
public class PropertyCalendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, name = "property_calendar_id")
    private Long propertyCalendarId;

    @OneToMany(mappedBy = "propertyCalendar")
    @JsonIgnoreProperties("propertyCalendar")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Event> events;

    @OneToOne(mappedBy = "propertyCalendar")
    @JsonIgnoreProperties("propertyCalendar")
    private Property property;

}
