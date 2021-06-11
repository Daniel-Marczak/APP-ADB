package pl.danielmarczak.adb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.danielmarczak.adb.entity.PropertyAddress;

@Repository
public interface PropertyAddressRepository extends JpaRepository<PropertyAddress, Long> {
}
