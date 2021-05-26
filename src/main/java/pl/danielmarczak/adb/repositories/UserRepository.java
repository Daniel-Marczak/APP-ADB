package pl.danielmarczak.adb.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.danielmarczak.adb.entities.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findFirstByUsername(String username);
    Optional<User> findFirstByEmail(String email);





}
