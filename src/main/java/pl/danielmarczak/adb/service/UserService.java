package pl.danielmarczak.adb.service;


public interface UserService {

    boolean checkDatabaseContainsUsername(String username);
    boolean checkDatabaseContainsEmail(String email);

}
