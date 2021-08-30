package pl.danielmarczak.adb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.danielmarczak.adb.entity.RateType;


@Repository
public interface RateTypeRepository extends JpaRepository <RateType, Long> {

}
