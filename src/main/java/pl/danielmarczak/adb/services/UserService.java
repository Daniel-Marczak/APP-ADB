package pl.danielmarczak.adb.services;


public interface UserService {

    boolean checkDatabaseContainsUsername(String username);
    boolean checkDatabaseContainsEmail(String email);
}
