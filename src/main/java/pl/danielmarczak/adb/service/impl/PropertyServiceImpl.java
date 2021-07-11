package pl.danielmarczak.adb.service.impl;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.*;
import pl.danielmarczak.adb.model.PropertyForm;
import pl.danielmarczak.adb.repository.PropertyRepository;
import pl.danielmarczak.adb.service.PropertyService;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;

    public PropertyServiceImpl(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }


    @Override
    public List<Property> getAllByUserId(Long userId) {
        return propertyRepository.getAllByUserId(userId).orElse(new ArrayList<>());
    }

    @Override
    public Property getPropertyById(Long propertyId) {
        return propertyRepository.getOne(propertyId);
    }

    @Override
    public void saveProperty(Property property) {
        propertyRepository.save(property);
    }

    @Override
    public Property createNewProperty(User user, PropertyForm propertyForm, PropertyType propertyType, Country country) {
        Property property = new Property();
        property.setPropertyName(propertyForm.getPropertyName());
        property.setIsAvailable(propertyForm.getIsAvailable());
        property.setUser(user);
        property.setPropertyType(propertyType);

        PropertyAddress propertyAddress = new PropertyAddress();
        propertyAddress.setCountry(country);
        propertyAddress.setCity(propertyForm.getCity());
        propertyAddress.setStreet(propertyForm.getStreet());
        propertyAddress.setPostalCode(propertyForm.getPostalCode());
        propertyAddress.setProvince(propertyForm.getProvince());
        propertyAddress.setRegion(propertyForm.getRegion());
        property.setPropertyAddress(propertyAddress);

        PropertyDescription propertyDescription = new PropertyDescription();
        propertyDescription.setDescriptionText(propertyForm.getPropertyDescription());
        property.setPropertyDescription(propertyDescription);

        property.setPropertyCalendar(new PropertyCalendar());
        property.setPropertyPhoto(new PropertyPhoto());

        return propertyRepository.save(property);
    }
}
