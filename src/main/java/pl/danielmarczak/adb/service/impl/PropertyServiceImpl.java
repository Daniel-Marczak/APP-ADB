package pl.danielmarczak.adb.service.impl;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.*;
import pl.danielmarczak.adb.model.PropertyForm;
import pl.danielmarczak.adb.repository.PropertyRepository;
import pl.danielmarczak.adb.service.*;

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
    private final RateTypeService rateTypeService;
    private final PriceService priceService;

    public PropertyServiceImpl(PropertyRepository propertyRepository, UserService userService, PropertyTypeService propertyTypeService, CountryService countryService, RateTypeService rateTypeService, PriceService priceService) {
        this.propertyRepository = propertyRepository;
        this.userService = userService;
        this.propertyTypeService = propertyTypeService;
        this.countryService = countryService;
        this.rateTypeService = rateTypeService;
        this.priceService = priceService;
    }


    @Override
    public List<Property> getAllByUserIdAndIsEnabledEquals(Long userId, Boolean isActive) {
        return propertyRepository.getAllByUserIdAndIsEnabledEquals(userId, isActive).orElse(new ArrayList<>());
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
        property.setIsEnabled(true);
        property.setUser(userService.findUserById(propertyForm.getUserId()));
        property.setPropertyType(propertyTypeService.findPropertyTypeById(propertyForm.getPropertyTypeId()));
        property.setRateType(rateTypeService.findRateTypeById(propertyForm.getRateTypeId()));

        PropertyAddress propertyAddress = new PropertyAddress();
        propertyAddress.setCountry(countryService.findCountryById(propertyForm.getCountryId()));
        propertyAddress.setLocation(propertyForm.getLocation());
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

        Price price = new Price();
        price.setAmount(propertyForm.getAmount());
        price.setCurrency(propertyForm.getCurrency());
        priceService.savePrice(price);
        property.setPrice(price);

        return propertyRepository.save(property);
    }

    public Property updateProperty(PropertyForm propertyForm){
        Property property = propertyRepository.findById(propertyForm.getPropertyId()).orElse(new Property()); //TODO
        property.setPropertyName(propertyForm.getPropertyName());
        property.setIsAvailable(propertyForm.getIsAvailable());
        property.setPropertyType(propertyTypeService.findPropertyTypeById(propertyForm.getPropertyTypeId()));
        property.setRateType(rateTypeService.findRateTypeById(propertyForm.getRateTypeId()));
        property.getPropertyAddress().setCountry(countryService.findCountryById(propertyForm.getCountryId()));
        property.getPropertyAddress().setLocation(propertyForm.getLocation());
        property.getPropertyAddress().setStreet(propertyForm.getStreet());
        property.getPropertyAddress().setPostalCode(propertyForm.getPostalCode());
        property.getPropertyAddress().setProvince(propertyForm.getProvince());
        property.getPropertyAddress().setRegion(propertyForm.getRegion());
        property.getPropertyDescription().setDescriptionText(propertyForm.getPropertyDescription());
        property.getPrice().setAmount(propertyForm.getAmount());
        property.getPrice().setCurrency(propertyForm.getCurrency());

        return propertyRepository.save(property);
    }

    @Override
    public void setPropertyIsEnabled(Boolean isActive, Long propertyId) {
        propertyRepository.setPropertyIsEnabled(isActive, propertyId);
    }

    @Override
    public List<Property> findAllByIsAvailableEquals(Boolean isAvailable) {
        return propertyRepository.findAllByIsAvailableEquals(isAvailable);
    }
}
