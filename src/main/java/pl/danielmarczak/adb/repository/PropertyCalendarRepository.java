package pl.danielmarczak.adb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.danielmarczak.adb.entity.PropertyCalendar;

@Repository
public interface PropertyCalendarRepository extends JpaRepository<PropertyCalendar, Long> {
}
