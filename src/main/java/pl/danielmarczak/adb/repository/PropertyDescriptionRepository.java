package pl.danielmarczak.adb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.danielmarczak.adb.entity.PropertyDescription;

@Repository
public interface PropertyDescriptionRepository extends JpaRepository<PropertyDescription, Long> {
}
