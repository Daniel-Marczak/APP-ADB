package pl.danielmarczak.adb.service.impl;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.User;
import pl.danielmarczak.adb.service.EmailService;
import pl.danielmarczak.adb.service.RegistrationService;
import pl.danielmarczak.adb.service.UserService;

@Service
public class RegistrationServiceImpl implements RegistrationService {

    private final EmailService emailService;
    private final UserService userService;

    public RegistrationServiceImpl(EmailService emailService, UserService userService) {
        this.emailService = emailService;
        this.userService = userService;
    }


    @Override
    public void registerNewUser(User newUser) {
        userService.saveUser(newUser);
        emailService.sendRegistrationConfirmationEmail(newUser);
    }
}
