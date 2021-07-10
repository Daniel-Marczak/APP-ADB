package pl.danielmarczak.adb.service.impl;


import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.PropertyType;
import pl.danielmarczak.adb.repository.PropertyTypeRepository;
import pl.danielmarczak.adb.service.PropertyTypeService;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PropertyTypeServiceImpl implements PropertyTypeService {

    private final PropertyTypeRepository propertyTypeRepository;

    public PropertyTypeServiceImpl(PropertyTypeRepository propertyTypeRepository) {
        this.propertyTypeRepository = propertyTypeRepository;
    }

    @Override
    public List<PropertyType> getAllPropertyTypes() {
        return propertyTypeRepository.findAll();
    }
}
