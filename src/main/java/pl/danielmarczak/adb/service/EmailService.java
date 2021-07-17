package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.User;

public interface EmailService {

    void sendRegistrationConfirmationEmail(User user);
}
