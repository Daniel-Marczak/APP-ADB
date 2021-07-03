package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.Customer;
import pl.danielmarczak.adb.entity.Event;
import pl.danielmarczak.adb.model.EventForm;

public interface EventService {

    Event saveEvent(Event event);

    Event createEventFromEventFormData(EventForm eventForm, Customer customer);
}
