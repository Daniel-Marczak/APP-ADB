package pl.danielmarczak.adb.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.danielmarczak.adb.service.CustomerService;
import pl.danielmarczak.adb.service.EventService;
import pl.danielmarczak.adb.service.PropertyCalendarService;


@RestController
@RequestMapping("/api/calendar")
public class PropertyCalendarRestController {

    protected Log logger = LogFactory.getLog(this.getClass());
    private final EventService eventService;
    private final CustomerService customerService;
    private final PropertyCalendarService propertyCalendarService;

    public PropertyCalendarRestController(EventService eventService, CustomerService customerService, PropertyCalendarService propertyCalendarService) {
        this.eventService = eventService;
        this.customerService = customerService;
        this.propertyCalendarService = propertyCalendarService;
    }






}
