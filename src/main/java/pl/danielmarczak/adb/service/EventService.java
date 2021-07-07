package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.Event;

import java.util.List;

public interface EventService {


    Event saveEvent(Event newEvent);

    Event getEventById(Long eventId);

    List<Event> getAllEventsByCalendarId(Long calendarId);

    void deleteEventFromPropertyCalendar(Long eventId);

    void updateEventStarAndEndDates(Long eventId, String start, String end);

}
