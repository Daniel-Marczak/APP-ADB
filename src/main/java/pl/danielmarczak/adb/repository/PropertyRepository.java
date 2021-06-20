package pl.danielmarczak.adb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.danielmarczak.adb.entity.Property;

import java.util.List;
import java.util.Optional;


@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    Optional <List<Property>> getAllByUserId(Long userId);

}
