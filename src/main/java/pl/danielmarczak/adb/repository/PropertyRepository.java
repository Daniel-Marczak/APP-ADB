package pl.danielmarczak.adb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.danielmarczak.adb.entity.Property;

import java.util.List;


@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    @Query(value = "SELECT p FROM Property p JOIN PropertyAddress pa WHERE pa.city = ?1 AND pa.province = ?2 AND pa.region = ?3")
    List<Property> customQuery3params(String city, String province, String region);

    @Query(value = "SELECT p FROM Property p JOIN PropertyAddress pa ON p.propertyAddress.id = pa.id WHERE pa.city = ?1")
    List<Property> customQueryCity(String city);

    @Query(value = "SELECT p FROM Property p JOIN PropertyAddress pa ON p.propertyAddress.id = pa.id WHERE pa.province = ?1")
    List<Property> customQueryProvince(String province);

    @Query(value = "SELECT p FROM Property p JOIN PropertyAddress pa ON p.propertyAddress.id = pa.id WHERE pa.region = ?1")
    List<Property> customQueryRegion(String region);

    @Query(value = "SELECT p FROM Property p JOIN PropertyAddress pa ON p.propertyAddress.id = pa.id WHERE pa.city = ?1 OR pa .province = ?2 OR pa .region = ?3")
    List<Property> customQueryCoPoR(String city, String province, String region);

    @Query(value = "SELECT p FROM Property p WHERE p.id = 1")
    Property getOneProperty();

}
