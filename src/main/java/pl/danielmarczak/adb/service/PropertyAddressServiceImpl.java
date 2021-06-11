package pl.danielmarczak.adb.service;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.repository.PropertyAddressRepository;

@Service
public class PropertyAddressServiceImpl implements PropertyAddressService{

    private final PropertyAddressRepository propertyAddressRepository;

    public PropertyAddressServiceImpl(PropertyAddressRepository propertyAddressRepository) {
        this.propertyAddressRepository = propertyAddressRepository;
    }
}
