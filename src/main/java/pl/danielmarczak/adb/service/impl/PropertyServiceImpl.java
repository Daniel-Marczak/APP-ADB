package pl.danielmarczak.adb.service.impl;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.Property;
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
}
