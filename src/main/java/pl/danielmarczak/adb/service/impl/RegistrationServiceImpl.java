package pl.danielmarczak.adb.service.impl;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.Token;
import pl.danielmarczak.adb.entity.User;
import pl.danielmarczak.adb.enums.TokenTypeEnum;
import pl.danielmarczak.adb.model.EmailContent;
import pl.danielmarczak.adb.service.EmailService;
import pl.danielmarczak.adb.service.RegistrationService;
import pl.danielmarczak.adb.service.TokenService;
import pl.danielmarczak.adb.service.UserService;

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
    public void registerUserAndSendERegistrationEmail(User user) {
        EmailContent emailContent = new EmailContent();
        emailContent.setSubject("User registration");
        emailContent.setContentHeader("Thank you for signing up.");
        emailContent.setContentBody(
                "To finish the registration process and activate your account you need to "
                + "verify your email address by clicking on the activation button below."
        );
        Token token = tokenService.createToken(userService.saveUser(user), TokenTypeEnum.USER_REGISTRATION);
        emailService.sendEmail(token, emailContent);
    }
}
