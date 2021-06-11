package pl.danielmarczak.adb.service;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.repository.PropertyRepository;

@Service
public class PropertyServiceImpl implements PropertyService{

    private final PropertyRepository propertyRepository;

    public PropertyServiceImpl(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }
}
