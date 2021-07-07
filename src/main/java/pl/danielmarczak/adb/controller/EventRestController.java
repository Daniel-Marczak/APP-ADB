package pl.danielmarczak.adb.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.*;
import pl.danielmarczak.adb.entity.Event;
import pl.danielmarczak.adb.service.EventService;

import java.util.List;


@RestController
@RequestMapping("/api/event")
public class EventRestController {

    protected Log logger = LogFactory.getLog(this.getClass());
    private final EventService eventService;

    public EventRestController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/get-calendar-events/{calendarId}")
    public List<Event> getAllEventsByCalendarId(@PathVariable Long calendarId){
        return eventService.getAllEventsByCalendarId(calendarId);
    }

    @PostMapping(value = "/add-event-to-property-calendar")
    public Event addEventToPropertyCalendar(@RequestBody Event newEvent) {
        return eventService.saveEvent(newEvent); //TODO
    }

    @PutMapping(value = "/update-event-start-and-end-dates/{eventId}/{start}/{end}")
    public Boolean updateEventStarAndEndDates(@PathVariable Long eventId, @PathVariable String start, @PathVariable String end) {
        eventService.updateEventStarAndEndDates(eventId, start, end);
        return true; //TODO
    }

    @PutMapping(value = "/update-event-data-in-database")
    public Event updateEventDataInDatabase(@RequestBody Event event) {
        return eventService.saveEvent(event);
    }

    @DeleteMapping("/delete-event-from-property-calendar/{eventId}")
    public Boolean deleteEventFromPropertyCalendar(@PathVariable Long eventId){
        eventService.deleteEventFromPropertyCalendar(eventId);
        return true; //TODO
    }

}
