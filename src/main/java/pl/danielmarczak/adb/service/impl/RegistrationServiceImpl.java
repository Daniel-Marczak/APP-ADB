package pl.danielmarczak.adb.service.impl;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.Token;
import pl.danielmarczak.adb.entity.User;
import pl.danielmarczak.adb.service.EmailService;
import pl.danielmarczak.adb.service.RegistrationService;
import pl.danielmarczak.adb.service.TokenService;
import pl.danielmarczak.adb.service.UserService;

import javax.mail.MessagingException;
import javax.transaction.Transactional;

@Service
@Transactional
public class RegistrationServiceImpl implements RegistrationService {

    private final EmailService emailService;
    private final UserService userService;
    private final TokenService tokenService;

    public RegistrationServiceImpl(EmailService emailService, UserService userService, TokenService tokenService) {
        this.emailService = emailService;
        this.userService = userService;
        this.tokenService = tokenService;
    }


    @Override
    public void registerNewUserAndSendERegistrationConfirmationEmail(User newUser) throws MessagingException {
        User user = userService.saveUser(newUser);
        Token token = tokenService.createRegistrationConfirmationToken(user);
        emailService.sendRegistrationConfirmationEmail(token);
    }
}
