package pl.danielmarczak.adb.controller;

import org.apache.tomcat.util.digester.ArrayStack;
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
    public List<String> getAvailableLocationsNames(){
        Optional<List<Property>> optionalProperties = Optional.ofNullable(propertyService.findAllByIsAvailableEquals(true));
        HashSet<String> locationsNames = new HashSet<>();
        if (optionalProperties.isPresent()){
            List<Property> properties = optionalProperties.get();
            properties.forEach(property -> {
                locationsNames.add(property.getPropertyAddress().getCountry().getCountryName());
                locationsNames.add(property.getPropertyAddress().getLocation());
                locationsNames.add(property.getPropertyAddress().getRegion());
                locationsNames.add(property.getPropertyAddress().getProvince());
            });
        } else {
            System.out.println("NOT PRESENT");
        }
        return new ArrayList<>(locationsNames);
    }


}
