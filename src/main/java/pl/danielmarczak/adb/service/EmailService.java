package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.Token;
import pl.danielmarczak.adb.model.EmailContent;

public interface EmailService {

    void sendEmail(Token token, EmailContent emailContent);
}
