package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.Property;

import java.util.List;
import java.util.Set;

public interface PropertyService {

    List<Property> findAllProperties();
    Property getProperty(Long propertyId);

    Set<Property> customQuery3params(String city, String province, String region);
    Set<Property> customQueryCoPoR(String city, String province, String region);
    Set<Property> customQueryRegion(String region);
    Set<Property> customQueryProvince(String province);
    Set<Property> customQueryCity(String city);
    public void saveProperty(Property property);

}
