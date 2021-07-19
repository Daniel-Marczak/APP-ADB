package pl.danielmarczak.adb.service.impl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.Token;
import pl.danielmarczak.adb.entity.User;
import pl.danielmarczak.adb.repository.TokenRepository;
import pl.danielmarczak.adb.service.TokenService;
import pl.danielmarczak.adb.service.UserService;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class TokenServiceImpl implements TokenService {

    protected Log logger = LogFactory.getLog(this.getClass());
    private final TokenRepository tokenRepository;
    private final UserService userService;

    public TokenServiceImpl(TokenRepository tokenRepository, UserService userService) {
        this.tokenRepository = tokenRepository;
        this.userService = userService;
    }

    @Override
    public void saveToken(pl.danielmarczak.adb.entity.Token token) {
        tokenRepository.save(token);
    }

    @Override
    public void deleteToken(Token token) {
        tokenRepository.delete(token);
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void deleteExpiredTokens() {
        List<Token> tokens = tokenRepository.findAll();
        tokens.forEach(token -> {
            if (!LocalDateTime.now().withNano(0).isBefore(token.getExpiresAt()) && token.getConfirmedAt() == null){
                tokenRepository.delete(token);
                userService.deleteUser(token.getUser());
            }
        });
    }

    @Override
    public Token findTokenByData(String data) {
        return tokenRepository.findByData(data).orElse(new Token());//TODO
    }

    @Override
    public Token createRegistrationConfirmationToken(User user) {
        Token token = new Token();
        token.setUser(user);
        token.setCreatedAt(LocalDateTime.now().withNano(0));
        token.setExpiresAt(LocalDateTime.now().withNano(0).plusMinutes(15));
        token.setData(UUID.randomUUID().toString());
        tokenRepository.save(token);
        return token;
    }


}
