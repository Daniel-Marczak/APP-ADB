package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.Property;

import java.util.List;

public interface PropertyService {

    List<Property> getAllByUserId(Long userId);

}
