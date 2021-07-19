package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.Token;

import javax.mail.MessagingException;

public interface EmailService {

    void sendRegistrationConfirmationEmail(Token token) throws MessagingException;
}
