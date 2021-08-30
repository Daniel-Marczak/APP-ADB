package pl.danielmarczak.adb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.danielmarczak.adb.entity.Price;

@Repository
public interface PriceRepository extends JpaRepository <Price, Long> {

}
