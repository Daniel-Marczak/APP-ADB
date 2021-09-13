package pl.danielmarczak.adb.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.danielmarczak.adb.entity.Property;
import pl.danielmarczak.adb.service.PropertyService;

import java.util.*;

@RestController
@RequestMapping("/api/reservation")
public class ReservationRestController {

    private final PropertyService propertyService;

    public ReservationRestController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping("/available-locations-names")
    public Map<String, HashSet<String>> getAvailableLocationsNames(){
        Optional<List<Property>> optionalProperties = Optional.ofNullable(propertyService.findAllByIsAvailableEquals(true));
        Map<String, HashSet<String>> map = new HashMap<>();
        map.put("countries", new HashSet<>());
        map.put("locations", new HashSet<>());
        map.put("regions", new HashSet<>());
        map.put("provinces", new HashSet<>());
        if (optionalProperties.isPresent()){
            List<Property> properties = optionalProperties.get();
            properties.forEach(property -> {
                map.get("countries").add(property.getPropertyAddress().getCountry().getCountryName());
                map.get("locations").add(property.getPropertyAddress().getLocation());
                map.get("regions").add(property.getPropertyAddress().getRegion());
                map.get("provinces").add(property.getPropertyAddress().getProvince());
            });

        } else {
            System.out.println("NOT PRESENT");
        }
        return map;
    }


}
