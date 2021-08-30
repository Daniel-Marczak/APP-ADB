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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "fk_property_calendar_id")
    private PropertyCalendar propertyCalendar;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_event_price_id")
    private Price price;

    private String title;
    private String start;
    private String end;
    private String additionalInfo;
    private Integer numberOfGuests;
    private Double discountSurcharge;




}
