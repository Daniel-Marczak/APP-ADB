package pl.danielmarczak.adb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.danielmarczak.adb.entity.PropertyPhoto;

@Repository
public interface PropertyPhotoRepository extends JpaRepository <PropertyPhoto, Long>{

    @Query(value = "SELECT pf FROM PropertyPhoto pf WHERE pf.id = ?1")
    PropertyPhoto getPropertyPhoto(Long propertyPhotoId);
}
