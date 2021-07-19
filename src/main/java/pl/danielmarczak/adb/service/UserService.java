package pl.danielmarczak.adb.service;


import pl.danielmarczak.adb.entity.User;


public interface UserService {

    User saveUser(User user);

    void deleteUser(User user);

    User findFirstByUsername(String username);

    User findFirstByEmail(String email);

    boolean checkDatabaseContainsUsername(String username);

    boolean checkDatabaseContainsEmail(String email);

    User findUserByUsername(String username);

    User findUserById(Long userId);

    void setUserIsEnabled(boolean isEnabled, Long userId );

}
