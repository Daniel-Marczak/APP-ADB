package pl.danielmarczak.adb.service.impl;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.Event;
import pl.danielmarczak.adb.entity.PropertyCalendar;
import pl.danielmarczak.adb.repository.EventRepository;
import pl.danielmarczak.adb.service.EventService;
import pl.danielmarczak.adb.service.PropertyCalendarService;

import javax.transaction.Transactional;

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
        Event event = eventRepository.save(newEvent);
        PropertyCalendar propertyCalendar = propertyCalendarService.getOnePropertyCalendarById(newEvent.getCalendarId());
        propertyCalendar.getEvents().add(event);
        propertyCalendarService.savePropertyCalendar(propertyCalendar);
        return event;
    }

    @Override
    public Event getEventById(Long eventId) {
        return eventRepository.getOne(eventId);
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
