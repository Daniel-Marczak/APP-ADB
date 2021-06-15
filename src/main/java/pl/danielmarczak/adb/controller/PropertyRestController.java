package pl.danielmarczak.adb.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.danielmarczak.adb.entity.Property;
import pl.danielmarczak.adb.service.PropertyAddressService;
import pl.danielmarczak.adb.service.PropertyRoomService;
import pl.danielmarczak.adb.service.PropertyService;
import pl.danielmarczak.adb.service.PropertyTypeOfRentalService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/property")
public class PropertyRestController {

    private final PropertyService propertyService;
    private final PropertyAddressService propertyAddressService;
    private final PropertyTypeOfRentalService propertyTypeOfRentalService;
    private final PropertyRoomService propertyRoomService;


    public PropertyRestController(
            PropertyService propertyService, PropertyAddressService propertyAddressService,
            PropertyTypeOfRentalService propertyTypeOfRentalService, PropertyRoomService propertyRoomService
    ) {
        this.propertyService = propertyService;
        this.propertyAddressService = propertyAddressService;
        this.propertyTypeOfRentalService = propertyTypeOfRentalService;
        this.propertyRoomService = propertyRoomService;
    }

    @GetMapping("/list")
    public List<Property> showAllProperties(){
        return propertyService.findAllProperties();
    }

    @GetMapping("/{propertyId}")
    public Property getOneProperty(@PathVariable Long propertyId){
        return propertyService.getProperty(propertyId);
    }


    @GetMapping("/testing")
    public Set<Property> kshdfhsd(){
        String city = "City 1";

        return propertyService.customQueryCoPoR(city,"","");
    }










}
