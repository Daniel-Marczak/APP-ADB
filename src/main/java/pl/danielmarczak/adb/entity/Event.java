package pl.danielmarczak.adb.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "events")
@Data
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    private String title;
    private String start;
    private String end;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_customer_id")
    private Customer customer;

    private String additionalInfo;

    @ManyToOne
    @JoinColumn(name = "fk_property_calendar_id")
    private PropertyCalendar propertyCalendar;

}
