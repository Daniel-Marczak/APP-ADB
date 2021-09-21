package pl.danielmarczak.adb.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.danielmarczak.adb.entity.Property;

import java.util.List;
import java.util.Optional;


@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    Optional <List<Property>> getAllByUserIdAndIsEnabledEquals(Long userId, Boolean isActive);

    @Modifying
    @Query("UPDATE Property p SET p.isEnabled = ?1 WHERE p.propertyId = ?2")
    void setPropertyIsEnabled(Boolean isEnabled, Long propertyId);

    List<Property> findAllByIsAvailableEquals(Boolean isAvailable);

    @Query(
            value = "SELECT p FROM Property p " +
                    "WHERE  p.propertyAddress.location = ?1 " +
                    "OR p.propertyAddress.province = ?1 " +
                    "OR p.propertyAddress.region = ?1 " +
                    "OR p.propertyAddress.country.countryName = ?1 " +
                    "AND p.isAvailable = true " +
                    "AND p.isEnabled = true " +
                    "ORDER BY p.stayPrice"
    )
    Page<Property> getAllPropertiesByLocationProvinceRegionOrCountry(String location, int guests, int days, Pageable pageable);

    @Modifying
    @Query(
            nativeQuery = true,
            value = "UPDATE properties" +
                    "    JOIN properties_addresses pa on pa.property_address_id = properties.fk_address_id " +
                    "    JOIN countries c on pa.fk_country_id = c.country_id " +
                    "    JOIN prices price on price.price_id = properties.fk_property_price_id " +
                    "    JOIN properties_types pt on properties.fk_type_id = pt.property_type_id " +
                    "SET stay_price = IF(properties.fk_rate_type_id = 1, price.amount * ?3, price.amount * ?3 * ?2) " +
                    "WHERE pa.location = ?1 " +
                    "   OR pa.province = ?1 " +
                    "   OR pa.region = ?1 " +
                    "   OR c.country_name = ?1 " +
                    "    AND is_available = true "
    )
    void updatePropertyStayPriceByPropertyLocationProvinceRegionOrCountry(String location, int guests, int days);


}
