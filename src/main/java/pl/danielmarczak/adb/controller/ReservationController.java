package pl.danielmarczak.adb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import pl.danielmarczak.adb.service.PropertyService;

import java.time.LocalDate;

@Controller
@RequestMapping("/reservation")
public class ReservationController {

    private final PropertyService propertyService;

    public ReservationController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping("/search-result")
    public String displaySearchResults(@RequestParam String location, @RequestParam LocalDate eventStart, @RequestParam LocalDate eventEnd){
        System.out.println(location);
        System.out.println(eventStart);
        System.out.println(eventEnd);
        return "index";
    }


}
