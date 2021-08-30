package pl.danielmarczak.adb.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "prices")
@Data
public class Price {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, name = "price_id")
    private Long priceId;

    private Double amount;
    private String currency;

}
