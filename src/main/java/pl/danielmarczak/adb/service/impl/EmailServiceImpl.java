package pl.danielmarczak.adb.service.impl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.Token;
import pl.danielmarczak.adb.entity.User;
import pl.danielmarczak.adb.enums.TokenTypeEnum;
import pl.danielmarczak.adb.model.EmailContent;
import pl.danielmarczak.adb.service.EmailService;
import pl.danielmarczak.adb.service.TokenService;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;

@Service
@Transactional
public class EmailServiceImpl implements EmailService {


    private final JavaMailSender mailSender;
    protected Log logger = LogFactory.getLog(this.getClass());
    private final TokenService tokenService;

    public EmailServiceImpl(JavaMailSender mailSender, TokenService tokenService) {
        this.mailSender = mailSender;
        this.tokenService = tokenService;
    }

    public void sendEmail(Token token, EmailContent emailContent) {
        MimeMessagePreparator preparator = new MimeMessagePreparator() {
            @Override
            public void prepare(MimeMessage mimeMessage) throws MessagingException {

                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8")   ;
                helper.setFrom("charityapp.2021@gmail.com");
                helper.setTo(token.getUser().getEmail());
                helper.setSubject(emailContent.getSubject());
                String emailText = "<!DOCTYPE html>\n" +
                        "<html>\n" +
                        "<head>\n" +
                        "<style>\n" +
                        "a {\n" +
                        "background-color: white;\n" +
                        "color: black;\n" +
                        "border: 2px solid green;\n" +
                        "padding: 10px 20px;\n" +
                        "text-align: center;\n" +
                        "text-decoration: none;\n" +
                        "display: inline-block;\n" +
                        "}\n" +
                        "a:hover {\n" +
                        "background-color: green;\n" +
                        "color: white;\n" +
                        "}\n" +
                        "</style>\n" +
                        "</head>\n" +
                        "<body>\n" +
                        "<h3>Hello " +
                        token.getUser().getUsername() +
                        "!</h3>" +
                        "<h4>" +
                        emailContent.getContentHeader() +
                        "</h4>" +
                        "<h4>" +
                        emailContent.getContentBody() +
                        "</h4>" +
                        "<a href=\"" +
                        "http://localhost:8080/token/validation?dta=" +
                        token.getData() +
                        "\">" +
                        setEmailButtonText(token) +
                        "</a>" +
                        "<br>" +
                        "<h4>Best regards," +
                        "<br>ADB Team</h4>" +
                        "</body>\n" +
                        "</html>";
                helper.setText(emailText, true);
            }
        };
        try {
            mailSender.send(preparator);
        } catch (MailException mailException){
            logger.warn("Mail not sent. The message is: " + mailException.getMessage());
        }
    }

    public static String setEmailButtonText(Token token){
        if (token.getType() == TokenTypeEnum.USER_EMAIL_UPDATE){
            return "Reactivate my account";
        }
        if (token.getType() == TokenTypeEnum.USER_PASSWORD_RESET){
            return "Reset my password";
        }
        return  "Activate my account";
    }

    @Override
    public void sendUserRegistrationEmail(User user) {
        EmailContent emailContent = new EmailContent();
        emailContent.setSubject("User registration");
        emailContent.setContentHeader("Thank you for signing up.");
        emailContent.setContentBody(
                "To finish the registration process and activate your account you need to " +
                        "verify your email address by clicking on the activation button below."
        );
        Token token = tokenService.createToken(user, TokenTypeEnum.USER_REGISTRATION);
        sendEmail(token, emailContent);
    }

    @Override
    public void sendUserEmailUpdateEmail(User user) {
        EmailContent emailContent = new EmailContent();
        emailContent.setSubject("Change of the email address associated with your account");
        emailContent.setContentHeader("Reactivate your account.");
        emailContent.setContentBody(
                "To reactivate your account you need to verify your new email address " +
                        "by clicking on the reactivation button below."
        );
        Token token = tokenService.createToken(user, TokenTypeEnum.USER_EMAIL_UPDATE);
        sendEmail(token, emailContent);
    }

    @Override
    public void sendUserPasswordResetEmail(User user) {
        EmailContent emailContent = new EmailContent();
        emailContent.setSubject("Password change request");
        emailContent.setContentHeader("Forgot your password?");
        emailContent.setContentBody(
                "We recently received a request to change the password for your ADB account. " +
                        "To reset your password, click on the button below."
        );
        Token token = tokenService.createToken(user, TokenTypeEnum.USER_PASSWORD_RESET);
        sendEmail(token, emailContent);
    }


}
