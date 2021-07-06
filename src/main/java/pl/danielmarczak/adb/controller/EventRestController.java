package pl.danielmarczak.adb.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.*;
import pl.danielmarczak.adb.entity.Event;
import pl.danielmarczak.adb.service.EventService;


@RestController
@RequestMapping("/api/event")
public class EventRestController {

    protected Log logger = LogFactory.getLog(this.getClass());
    private final EventService eventService;

    public EventRestController(EventService eventService) {
        this.eventService = eventService;
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
    public Boolean updateEventDataInDatabase(@RequestBody Event event) {
        eventService.saveEvent(event);
        return true; //TODO
    }

    @DeleteMapping("/delete-event-from-property-calendar/{eventId}")
    public Boolean deleteEventFromPropertyCalendar(@PathVariable Long eventId){
        eventService.deleteEventFromPropertyCalendar(eventId);
        return true; //TODO
    }

}
