package pl.danielmarczak.adb.repository;

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

}
