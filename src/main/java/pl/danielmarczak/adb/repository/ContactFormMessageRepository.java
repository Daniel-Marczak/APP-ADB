package pl.danielmarczak.adb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.danielmarczak.adb.entity.ContactFormMessage;

@Repository
public interface ContactFormMessageRepository extends JpaRepository<ContactFormMessage, Long> {

}
