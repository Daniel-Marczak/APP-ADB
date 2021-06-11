package pl.danielmarczak.adb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.danielmarczak.adb.entity.PropertyTypeOfRental;

@Repository
public interface PropertyTypeOfRentalRepository extends JpaRepository<PropertyTypeOfRental, Long> {

}
