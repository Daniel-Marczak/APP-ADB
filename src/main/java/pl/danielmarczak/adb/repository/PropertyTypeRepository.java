package pl.danielmarczak.adb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.danielmarczak.adb.entity.PropertyType;

@Repository
public interface PropertyTypeRepository extends JpaRepository<PropertyType, Long> {
}
