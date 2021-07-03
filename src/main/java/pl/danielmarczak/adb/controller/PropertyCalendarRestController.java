package pl.danielmarczak.adb.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.danielmarczak.adb.entity.Customer;
import pl.danielmarczak.adb.entity.Event;
import pl.danielmarczak.adb.model.EventForm;
import pl.danielmarczak.adb.service.CustomerService;
import pl.danielmarczak.adb.service.EventService;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;


@RestController
@RequestMapping("/api/calendar")
public class PropertyCalendarRestController {

    private final EventService eventService;
    private final CustomerService customerService;

    public PropertyCalendarRestController(EventService eventService, CustomerService customerService) {
        this.eventService = eventService;
        this.customerService = customerService;
    }

    @PostMapping(value = "/save-event-to-database", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<String> saveEventToDB(@RequestBody EventForm eventForm) throws JsonProcessingException {
        Customer newCustomer = customerService.createCustomerFromEventFormData(eventForm);
        customerService.saveCustomer(newCustomer);
        Event newEvent = eventService.createEventFromEventFormData(eventForm, newCustomer);
        eventService.saveEvent(newEvent);

        return new ResponseEntity<>("event", HttpStatus.OK);

    }


}
