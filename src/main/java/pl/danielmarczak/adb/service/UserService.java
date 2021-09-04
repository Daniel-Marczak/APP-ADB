package pl.danielmarczak.adb.service;


import pl.danielmarczak.adb.entity.CurrentUser;
import pl.danielmarczak.adb.entity.User;

import javax.servlet.http.HttpSession;
import java.util.Optional;


public interface UserService {

    User saveUser(User user);

    void deleteUser(User user);

    boolean checkDatabaseContainsUsername(String username);

    boolean checkDatabaseContainsEmail(String email);

    User findUserByUsername(String username);

    Optional<User> findUserByEmail(String email);

    User findUserById(Long userId);

    void setUserIsEnabled(boolean isEnabled, Long userId );

    Boolean isEmailAvailable(String email);

    Boolean isUsernameAvailable(String username);

    User updateUser(User user, CurrentUser currentUser);

    void setUserPassword(String password, Long userId);



}
