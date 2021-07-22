package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.User;

public interface RegistrationService {

    void registerNewUserAndSendERegistrationConfirmationEmail(User user);
}
