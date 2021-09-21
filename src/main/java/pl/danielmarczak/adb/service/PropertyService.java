package pl.danielmarczak.adb.service;

import org.springframework.data.domain.Page;
import pl.danielmarczak.adb.entity.Property;
import pl.danielmarczak.adb.model.PropertyForm;

import java.util.List;

public interface PropertyService {

    List<Property> getAllByUserIdAndIsEnabledEquals(Long userId, Boolean isActive);

    Property getPropertyById(Long propertyId);

    void saveProperty(Property property);

    Property createNewProperty(PropertyForm propertyForm);

    Property updateProperty(PropertyForm propertyForm);

    void setPropertyIsEnabled(Boolean isActive, Long propertyId);

    List<Property> findAllByIsAvailableEquals(Boolean isAvailable);

    Page<Property> getAllPropertiesByLocationProvinceRegionOrCountry(String location, int guests, int days, int requestedPage);

    void updatePropertyStayPriceByPropertyLocationProvinceRegionOrCountry(String location, int guests, int days);

    Page<Property> getAllPropertiesByLocationProvinceRegionOrCountryWithUpdatedStayPrice(String location, int guests, int days, int requestedPage);



}
