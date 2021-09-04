package pl.danielmarczak.adb.service.impl;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.User;
import pl.danielmarczak.adb.service.EmailService;
import pl.danielmarczak.adb.service.RegistrationService;
import pl.danielmarczak.adb.service.UserService;

import javax.transaction.Transactional;

@Service
@Transactional
public class RegistrationServiceImpl implements RegistrationService {

    private final EmailService emailService;
    private final UserService userService;

    public RegistrationServiceImpl(EmailService emailService, UserService userService) {
        this.emailService = emailService;
        this.userService = userService;
    }


    @Override
    public void registerUserAndSendERegistrationEmail(User user) {
        userService.saveUser(user);
        emailService.sendUserRegistrationEmail(user);
    }
}
