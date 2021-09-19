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
    public PropertyPhoto getPropertyPhotoById(Long propertyPhotoId) {
        return propertyPhotoRepository.findByPropertyPhotoId(propertyPhotoId);
    }

    @Override
    public PropertyPhoto savePropertyPhoto(PropertyPhoto propertyPhoto) {
        return propertyPhotoRepository.save(propertyPhoto);
    }

    @Override
    public String convertFileDataToImgSrc(byte[] fileData) {
        return java.util.Base64.getEncoder().encodeToString(fileData);
    }


}
