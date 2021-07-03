package pl.danielmarczak.adb.service.impl;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.Customer;
import pl.danielmarczak.adb.entity.Event;
import pl.danielmarczak.adb.model.EventForm;
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
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public Event createEventFromEventFormData(EventForm eventForm, Customer customer) {
        Event event = new Event();
        event.setTittle(eventForm.getTittle());
        event.setStart(eventForm.getStart());
        event.setEnd(eventForm.getEnd());
        event.setAdditionalInfo(event.getAdditionalInfo());
        event.setPropertyCalendar(propertyCalendarService.getOnePropertyCalendarById(Long.parseLong(eventForm.getCalendarId())));
        event.setCustomer(customer);

        return event;
    }
}
