package pl.danielmarczak.adb.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.danielmarczak.adb.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {


}
