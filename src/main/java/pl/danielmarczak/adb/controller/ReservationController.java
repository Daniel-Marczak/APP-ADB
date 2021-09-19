package pl.danielmarczak.adb.controller;

import org.springframework.beans.support.PagedListHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import pl.danielmarczak.adb.entity.Property;
import pl.danielmarczak.adb.service.PropertyPhotoService;
import pl.danielmarczak.adb.service.PropertyService;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.List;

@Controller
@RequestMapping("/reservation")
public class ReservationController {

    private final PropertyService propertyService;
    private final PropertyPhotoService propertyPhotoService;

    public ReservationController(PropertyService propertyService, PropertyPhotoService propertyPhotoService) {
        this.propertyService = propertyService;
        this.propertyPhotoService = propertyPhotoService;
    }

    @GetMapping("/search-result")
    public String displaySearchResults(@RequestParam String location, @RequestParam int guests, @RequestParam int days,
                                       @RequestParam Integer page, @RequestParam String eventStart, @RequestParam String eventEnd,
                                       HttpServletRequest request
    ) {
        List<Property> allByLocationName = propertyService.findAllByLocationName(location);
        allByLocationName.forEach(property -> {
            property.setStayPrice(propertyService.calculateStayPrice(property, days, guests));
            property.getPropertyPhoto().setImgSrc(propertyPhotoService.convertFileDataToImgSrc(property.getPropertyPhoto().getFileData()));
        });
        Collections.sort(allByLocationName);  //TODO add different sorting types
        PagedListHolder<Property> pagedListHolder = new PagedListHolder<>(allByLocationName);
        pagedListHolder.setPageSize(3);
        pagedListHolder.setPage(page);

        request.setAttribute("location", location);
        request.setAttribute("guests", guests);
        request.setAttribute("eventStart", eventStart);
        request.setAttribute("eventEnd", eventEnd);
        request.setAttribute("days", days);
        request.setAttribute("availableProperties", pagedListHolder.getPageList());
        request.setAttribute("totalPages", pagedListHolder.getPageCount());
        request.setAttribute("currentPage", page);

        return "property/property-search";
    }


}
