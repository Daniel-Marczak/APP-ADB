package pl.danielmarczak.adb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.danielmarczak.adb.entity.PropertyType;

public interface PropertyTypeRepository extends JpaRepository<PropertyType, Long> {
}
