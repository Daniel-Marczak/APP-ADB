package pl.danielmarczak.adb.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import pl.danielmarczak.adb.entity.*;
import pl.danielmarczak.adb.service.*;


import java.util.List;


@RestController
@RequestMapping("/api/property")
public class PropertyRestController {

    private final PropertyService propertyService;
    private final PropertyTypeService propertyTypeService;
    private final PropertyAddressService propertyAddressService;
    private final PropertyRoomService propertyRoomService;
    private final PropertyPhotoService propertyPhotoService;


    public PropertyRestController(
            PropertyService propertyService, PropertyTypeService propertyTypeService, PropertyAddressService propertyAddressService,
            PropertyRoomService propertyRoomService, PropertyPhotoService propertyPhotoService) {
        this.propertyService = propertyService;
        this.propertyTypeService = propertyTypeService;
        this.propertyAddressService = propertyAddressService;
        this.propertyRoomService = propertyRoomService;
        this.propertyPhotoService = propertyPhotoService;
    }

    @GetMapping(value = "/user-properties/{userId}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<Property> getAllPropertiesByUserId(@PathVariable Long userId) {
        List<Property> properties = propertyService.getAllByUserId(userId);
        properties.forEach(property -> {
            if (property.getUser() != null) {
                property.getUser().setPassword("");
                property.getUser().setRole(new Role());
                property.getUser().setId(null);
            }
        });
        //TODO hideSensitiveUserData()
        return properties;
    }





}
