package pl.danielmarczak.adb.service.impl;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.repository.PropertyAddressRepository;
import pl.danielmarczak.adb.service.PropertyAddressService;

import javax.transaction.Transactional;

@Service
@Transactional
public class PropertyAddressServiceImpl implements PropertyAddressService {

    private final PropertyAddressRepository propertyAddressRepository;

    public PropertyAddressServiceImpl(PropertyAddressRepository propertyAddressRepository) {
        this.propertyAddressRepository = propertyAddressRepository;
    }
}
