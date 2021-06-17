package pl.danielmarczak.adb.service.impl;


import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.repository.PropertyTypeRepository;
import pl.danielmarczak.adb.service.PropertyTypeService;

import javax.transaction.Transactional;

@Service
@Transactional
public class PropertyTypeServiceImpl implements PropertyTypeService {

    private final PropertyTypeRepository propertyTypeRepository;

    public PropertyTypeServiceImpl(PropertyTypeRepository propertyTypeRepository) {
        this.propertyTypeRepository = propertyTypeRepository;
    }
}
