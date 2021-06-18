package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.Property;

import java.util.List;

public interface PropertyService {

    List<Property> findAllProperties();
    Property getProperty(Long propertyId);

    List<Property> customQuery3params(String city, String province, String region);
    List<Property> customQueryCoPoR(String city, String province, String region);
    List<Property> customQueryRegion(String region);
    List<Property> customQueryProvince(String province);
    List<Property> customQueryCity(String city);
    public void saveProperty(Property property);

    Property getOneProperty();

}
