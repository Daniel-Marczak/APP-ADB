package pl.danielmarczak.adb.service;

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



}
