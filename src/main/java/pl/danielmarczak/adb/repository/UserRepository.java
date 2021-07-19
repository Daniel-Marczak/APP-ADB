package pl.danielmarczak.adb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.danielmarczak.adb.entity.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findFirstByUsername(String username);
    Optional<User> findFirstByEmail(String email);
    Optional<User> findUserByUsername(String username);

    @Modifying
    @Query(value = "UPDATE User  u SET u.isEnabled = ?1 WHERE u.id = ?2 ")
    void setUserIsEnabled(boolean isEnabled, Long userId );





}
