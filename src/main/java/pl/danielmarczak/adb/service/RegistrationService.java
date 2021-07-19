package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.User;

import javax.mail.MessagingException;

public interface RegistrationService {

    void registerNewUserAndSendERegistrationConfirmationEmail(User user) throws MessagingException;
}
