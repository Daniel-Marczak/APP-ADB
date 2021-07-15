package pl.danielmarczak.adb.service.impl;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.*;
import pl.danielmarczak.adb.model.PropertyForm;
import pl.danielmarczak.adb.repository.PropertyRepository;
import pl.danielmarczak.adb.service.CountryService;
import pl.danielmarczak.adb.service.PropertyService;
import pl.danielmarczak.adb.service.PropertyTypeService;
import pl.danielmarczak.adb.service.UserService;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;
    private final UserService userService;
    private final PropertyTypeService propertyTypeService;
    private final CountryService countryService;

    public PropertyServiceImpl(PropertyRepository propertyRepository, UserService userService, PropertyTypeService propertyTypeService, CountryService countryService) {
        this.propertyRepository = propertyRepository;
        this.userService = userService;
        this.propertyTypeService = propertyTypeService;
        this.countryService = countryService;
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
    public Property createNewProperty(PropertyForm propertyForm) {
        Property property = new Property();
        property.setPropertyId(propertyForm.getPropertyId());
        property.setPropertyName(propertyForm.getPropertyName());
        property.setIsAvailable(propertyForm.getIsAvailable());
        property.setUser(userService.findUserById(propertyForm.getUserId()));
        property.setPropertyType(propertyTypeService.findPropertyTypeById(propertyForm.getPropertyTypeId()));

        PropertyAddress propertyAddress = new PropertyAddress();
        propertyAddress.setCountry(countryService.findCountryById(propertyForm.getCountryId()));
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

    public Property updateProperty(PropertyForm propertyForm){
        Property property = propertyRepository.findById(propertyForm.getPropertyId()).orElse(new Property()); //TODO
        property.setPropertyName(propertyForm.getPropertyName());
        property.setIsAvailable(propertyForm.getIsAvailable());
        property.setPropertyType(propertyTypeService.findPropertyTypeById(propertyForm.getPropertyTypeId()));
        property.getPropertyAddress().setCountry(countryService.findCountryById(propertyForm.getCountryId()));
        property.getPropertyAddress().setCity(propertyForm.getCity());
        property.getPropertyAddress().setStreet(propertyForm.getStreet());
        property.getPropertyAddress().setPostalCode(propertyForm.getPostalCode());
        property.getPropertyAddress().setProvince(propertyForm.getProvince());
        property.getPropertyAddress().setRegion(propertyForm.getRegion());
        property.getPropertyDescription().setDescriptionText(propertyForm.getPropertyDescription());
        return propertyRepository.save(property);
    }

    @Override
    public void deleteProperty(Long propertyId) {
        propertyRepository.deleteById(propertyId);
    }
}
