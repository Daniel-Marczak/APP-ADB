package pl.danielmarczak.adb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.danielmarczak.adb.entity.PropertyRoom;

@Repository
public interface PropertyRoomRepository extends JpaRepository<PropertyRoom, Long> {

}
