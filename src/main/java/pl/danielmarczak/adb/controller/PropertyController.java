package pl.danielmarczak.adb.controller;

import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import pl.danielmarczak.adb.entity.CurrentUser;
import pl.danielmarczak.adb.entity.Property;
import pl.danielmarczak.adb.service.PropertyPhotoService;
import pl.danielmarczak.adb.service.PropertyService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/property")
public class PropertyController {

    private final PropertyService propertyService;
    private final PropertyPhotoService propertyPhotoService;

    public PropertyController(PropertyService propertyService, PropertyPhotoService propertyPhotoService) {
        this.propertyService = propertyService;
        this.propertyPhotoService = propertyPhotoService;
    }

    @GetMapping("/user-properties")
    public String getUserProperties(@AuthenticationPrincipal CurrentUser currentUser, HttpServletRequest request){
        request.setAttribute("userId", currentUser.getUser().getId());
        return "role_user/properties";
    }

    @GetMapping("/search")
    public String getSearchResults(@RequestParam String location, @RequestParam int guests, @RequestParam int days,
                                   @RequestParam Integer pageRequest, @RequestParam String eventStart, @RequestParam String eventEnd,
                                   HttpServletRequest request
    ) {
        Page<Property> properties = propertyService.getAllPropertiesByLocationProvinceRegionOrCountryWithUpdatedStayPrice(location, guests, days, pageRequest);
        List<Property> propertyList = properties.getContent();
        propertyList.forEach(p -> p.getPropertyPhoto().setImgSrc(propertyPhotoService.convertFileDataToImgSrc(p.getPropertyPhoto().getFileData())));

        //TODO add different sorting types

        request.setAttribute("location", location);
        request.setAttribute("guests", guests);
        request.setAttribute("eventStart", eventStart);
        request.setAttribute("eventEnd", eventEnd);
        request.setAttribute("days", days);
        request.setAttribute("availableProperties", properties.getContent());
        request.setAttribute("totalPages", properties.getTotalPages());
        request.setAttribute("currentPage", pageRequest);

        return "property/search";
    }

    @GetMapping("/details")
    public String getPropertyDetails(@RequestParam long propertyId, HttpServletRequest request){
        request.setAttribute("property", propertyService.getPropertyById(propertyId));
        return "property/details";
    }

}
