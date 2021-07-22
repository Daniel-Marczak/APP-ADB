package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.Token;

public interface EmailService {

    void sendRegistrationConfirmationEmail(Token token);
}
