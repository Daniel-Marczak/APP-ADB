package pl.danielmarczak.adb.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "rate_types")
@Data
public class RateType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, name = "rate_type_id")
    private Long rateTypeId;

    private String rateTypeName;


}
