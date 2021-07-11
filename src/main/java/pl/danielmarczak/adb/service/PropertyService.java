package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.Country;
import pl.danielmarczak.adb.entity.Property;
import pl.danielmarczak.adb.entity.PropertyType;
import pl.danielmarczak.adb.entity.User;
import pl.danielmarczak.adb.model.PropertyForm;

import java.util.List;

public interface PropertyService {

    List<Property> getAllByUserId(Long userId);

    Property getPropertyById(Long propertyId);

    void saveProperty(Property property);

    Property createNewProperty(User user, PropertyForm propertyForm, PropertyType propertyType, Country country);

}
