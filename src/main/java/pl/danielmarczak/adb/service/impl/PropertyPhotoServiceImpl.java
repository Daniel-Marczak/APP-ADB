package pl.danielmarczak.adb.service.impl;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.PropertyPhoto;
import pl.danielmarczak.adb.repository.PropertyPhotoRepository;
import pl.danielmarczak.adb.service.PropertyPhotoService;

@Service
public class PropertyPhotoServiceImpl implements PropertyPhotoService {

    private final PropertyPhotoRepository propertyPhotoRepository;

    public PropertyPhotoServiceImpl(PropertyPhotoRepository propertyPhotoRepository) {
        this.propertyPhotoRepository = propertyPhotoRepository;
    }

    @Override
    public PropertyPhoto getPropertyPhoto(Long propertyPhotoId) {
        return propertyPhotoRepository.getPropertyPhoto(propertyPhotoId);
    }
}
