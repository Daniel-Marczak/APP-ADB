package pl.danielmarczak.adb.service;


import pl.danielmarczak.adb.entity.CurrentUser;
import pl.danielmarczak.adb.entity.User;

import javax.servlet.http.HttpSession;


public interface UserService {

    User saveUser(User user);

    void deleteUser(User user);

    boolean checkDatabaseContainsUsername(String username);

    boolean checkDatabaseContainsEmail(String email);

    User findUserByUsername(String username);

    User findUserById(Long userId);

    void setUserIsEnabled(boolean isEnabled, Long userId );

    Boolean isEmailAvailable(String email);

    Boolean isUsernameAvailable(String username);

    void updateUser(User user, CurrentUser currentUser, HttpSession session);



}
