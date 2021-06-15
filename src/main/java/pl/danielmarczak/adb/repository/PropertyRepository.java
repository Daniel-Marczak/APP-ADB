package pl.danielmarczak.adb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.danielmarczak.adb.entity.Property;

import java.util.Set;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    @Query(value = "SELECT p FROM Property p JOIN PropertyAddress pa WHERE pa.city = ?1 AND pa.province = ?2 AND pa.region = ?3")
    Set<Property> customQuery3params(String city, String province, String region);

    @Query(value = "SELECT p FROM Property p JOIN PropertyAddress pa ON p.address.id = pa.id WHERE pa.city = ?1")
    Set<Property> customQueryCity(String city);

    @Query(value = "SELECT p FROM Property p JOIN PropertyAddress pa ON p.address.id = pa.id WHERE pa.province = ?1")
    Set<Property> customQueryProvince(String province);

    @Query(value = "SELECT p FROM Property p JOIN PropertyAddress pa ON p.address.id = pa.id WHERE pa.region = ?1")
    Set<Property> customQueryRegion(String region);

    @Query(value = "SELECT p FROM Property p JOIN PropertyAddress pa ON p.address.id = pa.id WHERE pa.city = ?1 OR pa .province = ?2 OR pa .region = ?3")
    Set<Property> customQueryCoPoR(String city, String province, String region);

}
