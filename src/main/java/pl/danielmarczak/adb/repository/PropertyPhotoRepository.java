package pl.danielmarczak.adb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.danielmarczak.adb.entity.PropertyPhoto;

@Repository
public interface PropertyPhotoRepository extends JpaRepository <PropertyPhoto, Long>{


    PropertyPhoto findByPropertyPhotoId(Long propertyPhotoId);
}
