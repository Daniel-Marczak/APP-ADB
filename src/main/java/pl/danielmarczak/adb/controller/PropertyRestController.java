package pl.danielmarczak.adb.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.danielmarczak.adb.entity.*;
import pl.danielmarczak.adb.model.PropertyForm;
import pl.danielmarczak.adb.service.*;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/api/property")
public class PropertyRestController {

    protected Log logger = LogFactory.getLog(this.getClass());
    private final UserService userService;
    private final PropertyService propertyService;
    private final PropertyTypeService propertyTypeService;
    private final PropertyAddressService propertyAddressService;
    private final PropertyRoomService propertyRoomService;
    private final PropertyPhotoService propertyPhotoService;
    private final CountryService countryService;


    public PropertyRestController(
            UserService userService, PropertyService propertyService, PropertyTypeService propertyTypeService, PropertyAddressService propertyAddressService,
            PropertyRoomService propertyRoomService, PropertyPhotoService propertyPhotoService, CountryService countryService) {
        this.userService = userService;
        this.propertyService = propertyService;
        this.propertyTypeService = propertyTypeService;
        this.propertyAddressService = propertyAddressService;
        this.propertyRoomService = propertyRoomService;
        this.propertyPhotoService = propertyPhotoService;
        this.countryService = countryService;
    }

    @GetMapping(value = "/user-properties/{userId}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<Property> getAllPropertiesByUserId(@PathVariable Long userId) {
        List<Property> properties = propertyService.getAllByUserId(userId);
        properties.forEach(property -> {
            property.getUser().setPassword("");
            property.getUser().setRole(new Role());
            property.getUser().setId(null);
        });
        return properties;
    }

    @PostMapping(value = "save-new-property-to-database")
    public Property saveNewPropertyToDatabase(@RequestBody PropertyForm propertyForm){
        User user = userService.findUserById(propertyForm.getUserId());
        PropertyType propertyType = propertyTypeService.findPropertyTypeById(propertyForm.getPropertyTypeId());
        Country country = countryService.findCountryById(propertyForm.getCountryId());
        Property property = propertyService.createNewProperty(user, propertyForm, propertyType, country);
        property.getUser().setPassword("");
        property.getUser().setRole(new Role());
        return property;
    }

    @GetMapping(value = "/get-all-property-types")
    List<PropertyType> getAllPropertyTypes(){
        return propertyTypeService.getAllPropertyTypes();
    }

    @GetMapping("/get-all-countries") //TODO arc
    List<Country> getAllCountries(){
        return countryService.getAllCountries();
    }

    @PostMapping(value = "/upload-property-photo/{propertyPhotoId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public PropertyPhoto uploadPropertyPhoto(@RequestParam("file") MultipartFile file, @PathVariable Long propertyPhotoId) throws IOException {
        PropertyPhoto propertyPhoto = propertyPhotoService.getPropertyPhotoById(propertyPhotoId);
        propertyPhoto.setFileName(file.getOriginalFilename());
        propertyPhoto.setFileType(file.getContentType());
        propertyPhoto.setFileData(file.getBytes());
        return propertyPhotoService.savePropertyPhoto(propertyPhoto);
    }


}
