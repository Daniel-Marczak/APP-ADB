package pl.danielmarczak.adb.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.danielmarczak.adb.entity.*;
import pl.danielmarczak.adb.service.*;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/api/property")
public class PropertyRestController {

    protected Log logger = LogFactory.getLog(this.getClass());
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
            property.getUser().setPassword("");
            property.getUser().setRole(new Role());
            property.getUser().setId(null);
        });
        return properties;
    }

    //TODO PropertyPhotoRestController
    @PostMapping(value = "/upload-property-photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Boolean uploadPropertyPhoto(@RequestParam("file") MultipartFile file) throws IOException {
        PropertyPhoto propertyPhoto = new PropertyPhoto();
        propertyPhoto.setFileName(file.getOriginalFilename());
        propertyPhoto.setFileType(file.getContentType());
        propertyPhoto.setFileData(file.getBytes());
        propertyPhotoService.savePropertyPhoto(propertyPhoto);
        //TODO add photo id to property (@Tran or @Param)

        return true;//TODO
    }


}
