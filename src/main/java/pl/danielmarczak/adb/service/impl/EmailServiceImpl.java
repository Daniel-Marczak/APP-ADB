package pl.danielmarczak.adb.service.impl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.Token;
import pl.danielmarczak.adb.enums.TokenTypeEnum;
import pl.danielmarczak.adb.model.EmailContent;
import pl.danielmarczak.adb.service.EmailService;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;

@Service
@Transactional
public class EmailServiceImpl implements EmailService {


    private final JavaMailSender mailSender;
    protected Log logger = LogFactory.getLog(this.getClass());

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
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
        return  "Activate my account";
    }


}
