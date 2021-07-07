package pl.danielmarczak.adb.service.impl;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.Event;
import pl.danielmarczak.adb.repository.EventRepository;
import pl.danielmarczak.adb.service.EventService;
import pl.danielmarczak.adb.service.PropertyCalendarService;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final PropertyCalendarService propertyCalendarService;

    public EventServiceImpl(EventRepository eventRepository, PropertyCalendarService propertyCalendarService) {
        this.eventRepository = eventRepository;
        this.propertyCalendarService = propertyCalendarService;
    }

    @Override
    public Event saveEvent(Event newEvent) {
        return eventRepository.save(newEvent);
    }

    @Override
    public Event getEventById(Long eventId) {
        return eventRepository.getOne(eventId);
    }

    @Override
    public List<Event> getAllEventsByCalendarId(Long calendarId) {
        return eventRepository.getAllEventsByCalendarId(calendarId);
    }


    @Override
    public void deleteEventFromPropertyCalendar(Long eventId) {
        eventRepository.deleteById(eventId);
    }

    @Override
    public void updateEventStarAndEndDates(Long eventId, String start, String end) {
        Event event = eventRepository.getOne(eventId);
        event.setStart(start);
        event.setEnd(end);
        eventRepository.save(event);
    }


}
