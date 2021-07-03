package pl.danielmarczak.adb.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "events")
@Data
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long eventId;

    private String tittle;
    private String start;
    private String end;

    @ManyToOne
    @JoinColumn(name = "property_calendar_id")
    @JsonIgnoreProperties("events")
    private PropertyCalendar propertyCalendar;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnoreProperties("event")
    private Customer customer;

    private String additionalInfo;

}
