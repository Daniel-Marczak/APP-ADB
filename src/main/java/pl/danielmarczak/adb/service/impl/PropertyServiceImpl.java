package pl.danielmarczak.adb.service.impl;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.Property;
import pl.danielmarczak.adb.entity.Role;
import pl.danielmarczak.adb.entity.User;
import pl.danielmarczak.adb.repository.PropertyRepository;
import pl.danielmarczak.adb.service.PropertyService;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;

    public PropertyServiceImpl(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    @Override
    public List<Property>findAllProperties() {
        return propertyRepository.findAll();
    }

    @Override
    public Property getProperty(Long propertyId) {
        return propertyRepository.getOne(propertyId);
    }

    @Override
    public List<Property> customQuery3params(String city, String province, String region) {
        return propertyRepository.customQuery3params(city, province, region);
    }

    @Override
    public List<Property> customQueryCoPoR(String city, String province, String region) {
        List<Property> properties = propertyRepository.customQueryCoPoR(city, province, region);
        properties.forEach(property -> hideSensitiveUserData(property.getUser()));
        return properties;
    }

    @Override
    public List<Property> customQueryRegion(String region) {
        return propertyRepository.customQueryRegion(region);
    }

    @Override
    public List<Property> customQueryProvince(String province) {
        return propertyRepository.customQueryProvince(province);
    }

    @Override
    public List<Property> customQueryCity(String city) {
        return propertyRepository.customQueryCity(city);
    }

    private void hideSensitiveUserData(User user){
        user.setPassword("");
        user.setRole(new Role());
    }

    public void saveProperty(Property property){
        propertyRepository.save(property);
    }

    @Override
    public Property getOneProperty() {
        return propertyRepository.getOneProperty();
    }


}
