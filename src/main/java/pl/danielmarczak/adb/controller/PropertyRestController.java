package pl.danielmarczak.adb.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.danielmarczak.adb.entity.*;
import pl.danielmarczak.adb.service.PropertyAddressService;
import pl.danielmarczak.adb.service.PropertyRoomService;
import pl.danielmarczak.adb.service.PropertyService;
import pl.danielmarczak.adb.service.PropertyTypeService;

import java.util.List;


@RestController
@RequestMapping("/api/property")
public class PropertyRestController {

    private final PropertyService propertyService;
    private final PropertyTypeService propertyTypeService;
    private final PropertyAddressService propertyAddressService;
    private final PropertyRoomService propertyRoomService;


    public PropertyRestController(
            PropertyService propertyService, PropertyTypeService propertyTypeService, PropertyAddressService propertyAddressService,
            PropertyRoomService propertyRoomService
    ) {
        this.propertyService = propertyService;
        this.propertyTypeService = propertyTypeService;
        this.propertyAddressService = propertyAddressService;
        this.propertyRoomService = propertyRoomService;
    }

    @GetMapping("/list")
    public List<Property> showAllProperties() {
        return propertyService.findAllProperties();
    }

    @GetMapping("/{propertyId}")
    public Property getOneProperty(@PathVariable Long propertyId) {
        return propertyService.getProperty(propertyId);
    }


    @GetMapping("/testing")
    public Property testing() {

        return propertyService.getOneProperty();
    }


}
