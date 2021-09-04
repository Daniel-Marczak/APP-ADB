package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.Token;
import pl.danielmarczak.adb.entity.User;
import pl.danielmarczak.adb.enums.TokenTypeEnum;

import java.util.Optional;

public interface TokenService {

    void saveToken(Token token);

    void deleteToken(Token token);

    Optional<Token> findTokenByData(String data);

    Token createToken(User user, TokenTypeEnum tokenType);
}
