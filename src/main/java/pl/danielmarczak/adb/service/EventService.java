package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.Event;

public interface EventService {


    Event saveEvent(Event newEvent);

    Event getEventById(Long eventId);

    void deleteEventFromPropertyCalendar(Long eventId);

    void updateEventStarAndEndDates(Long eventId, String start, String end);

}
