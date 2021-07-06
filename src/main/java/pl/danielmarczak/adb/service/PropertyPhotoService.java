package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.PropertyPhoto;

public interface PropertyPhotoService {

    PropertyPhoto getPropertyPhotoById(Long propertyPhotoId);

    void savePropertyPhoto(PropertyPhoto propertyPhoto);
}
