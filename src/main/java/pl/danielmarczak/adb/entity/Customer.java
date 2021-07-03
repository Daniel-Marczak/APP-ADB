package pl.danielmarczak.adb.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "customers")
@Data
@NoArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, name = "customer_id")
    private Long customerId;

    private String customerName;
    private String customerSurname;
    private String customerPhone;

    @OneToOne(mappedBy = "customer")
    @JsonIgnoreProperties("customer")
    private Event event;

}
