package pl.danielmarczak.adb.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "customers")
@Data
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, name = "customer_id")
    private Long customerId;

    private String customerName;
    private String customerSurname;
    private String customerPhone;
    private String customerEmail;

}
