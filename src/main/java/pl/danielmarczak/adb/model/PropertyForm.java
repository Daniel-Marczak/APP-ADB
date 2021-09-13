package pl.danielmarczak.adb.model;

import lombok.Data;

@Data
public class PropertyForm {

    private Long propertyId;
    private Long userId;
    private String propertyName;
    private Boolean isAvailable;
    private Long propertyTypeId;
    private Long rateTypeId;
    private Long countryId;
    private String location;
    private String street;
    private String postalCode;
    private String province;
    private String region;
    private String propertyDescription;
    private Double amount;
    private String currency;


}
