package pl.danielmarczak.adb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.danielmarczak.adb.entity.Country;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
}
