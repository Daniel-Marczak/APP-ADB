package pl.danielmarczak.adb.service.impl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.Token;
import pl.danielmarczak.adb.entity.User;
import pl.danielmarczak.adb.enums.TokenTypeEnum;
import pl.danielmarczak.adb.repository.TokenRepository;
import pl.danielmarczak.adb.repository.UserRepository;
import pl.danielmarczak.adb.service.TokenService;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class TokenServiceImpl implements TokenService {

    protected Log logger = LogFactory.getLog(this.getClass());
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;

    public TokenServiceImpl(TokenRepository tokenRepository, UserRepository userRepository) {
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
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
                userRepository.delete(token.getUser());
            }
        });
    }

    @Override
    public Optional<Token> findTokenByData(String data) {
        return tokenRepository.findByData(data);//TODO
    }

    @Override
    public Token createToken(User user, TokenTypeEnum tokenType) {
        Token token = new Token();
        token.setUser(user);
        token.setCreatedAt(LocalDateTime.now().withNano(0));
        token.setExpiresAt(LocalDateTime.now().withNano(0).plusHours(24));
        token.setData(UUID.randomUUID().toString());
        token.setType(tokenType);
        tokenRepository.save(token);
        return token;
    }


}
