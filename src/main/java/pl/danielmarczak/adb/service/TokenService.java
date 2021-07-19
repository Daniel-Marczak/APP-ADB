package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.Token;
import pl.danielmarczak.adb.entity.User;

public interface TokenService {

    void saveToken(Token token);

    void deleteToken(Token token);

    Token findTokenByData(String data);

    Token createRegistrationConfirmationToken(User user);
}
