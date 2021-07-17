package pl.danielmarczak.adb.service.impl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.User;
import pl.danielmarczak.adb.service.EmailService;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {


    private final JavaMailSender mailSender;
    protected Log logger = LogFactory.getLog(this.getClass());

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendRegistrationConfirmationEmail(User user){

        MimeMessagePreparator preparator = new MimeMessagePreparator() {
            @Override
            public void prepare(MimeMessage mimeMessage) throws Exception {
                mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(user.getEmail()));
                mimeMessage.setFrom(new InternetAddress("charityapp2021@gmail.com")); //TODO temporary email
                mimeMessage.setText(
                        "Hello " + user.getUsername() + "\n"
                                + "Thank you for signing up!!\n"
                                + "To finish the registration process you need to verify your email address\n"
                                + "by clicking on the following link:\n"
                                + "http://localhost:8080/login"
                );
            }
        };
        try {
            mailSender.send(preparator);
        } catch (MailException exception) {
            logger.warn(exception.getMessage());
        }


    }


}
