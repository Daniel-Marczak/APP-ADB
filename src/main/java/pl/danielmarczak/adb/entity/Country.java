package pl.danielmarczak.adb.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "countries")
@Data
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, name = "country_id")
    private Long countryId;

    private String countryName;
    private String currencyName;
    private String currencyCode;

}
