package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.PropertyType;

import java.util.List;

public interface PropertyTypeService {

    List<PropertyType> getAllPropertyTypes();

    PropertyType findPropertyTypeById(Long propertyTypeId);
}
