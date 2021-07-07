package pl.danielmarczak.adb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.danielmarczak.adb.entity.Event;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    @Query(value = "SELECT e FROM Event e WHERE e.propertyCalendar.propertyCalendarId = ?1")
    List<Event> getAllEventsByCalendarId(Long calendarId);

}
