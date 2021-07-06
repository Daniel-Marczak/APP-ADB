package pl.danielmarczak.adb.service;


import pl.danielmarczak.adb.entity.User;


public interface UserService {

    void saveUser(User user);

    User findFirstByUsername(String username);

    User findFirstByEmail(String email);

    boolean checkDatabaseContainsUsername(String username);

    boolean checkDatabaseContainsEmail(String email);

    User findUserByUsername(String username);


}
