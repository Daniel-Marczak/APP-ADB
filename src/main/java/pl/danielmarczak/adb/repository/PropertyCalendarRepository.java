package pl.danielmarczak.adb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyCalendarRepository extends JpaRepository<PropertyCalendarRepository, Long> {
}
