package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.Token;
import pl.danielmarczak.adb.entity.User;
import pl.danielmarczak.adb.model.EmailContent;

public interface EmailService {

    void sendEmail(Token token, EmailContent emailContent);

    void sendUserRegistrationEmail(User user);

    void sendUserEmailUpdateEmail(User user);

    void sendUserPasswordResetEmail(User user);
}
