package pl.danielmarczak.adb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import pl.danielmarczak.adb.entity.Token;
import pl.danielmarczak.adb.entity.User;
import pl.danielmarczak.adb.service.EmailService;
import pl.danielmarczak.adb.service.TokenService;
import pl.danielmarczak.adb.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Controller
@RequestMapping("/password-reset")
public class PasswordResetController {

    private final UserService userService;
    private final TokenService tokenService;
    private final EmailService emailService;

    public PasswordResetController(UserService userService, TokenService tokenService, EmailService emailService) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.emailService = emailService;
    }

    @GetMapping
    public String passwordReset(){

        return "password_reset/request";
    }

    @PostMapping
    public String passwordReset(@RequestParam String email, HttpServletRequest request){
        String emailRegex = "^(?=.{5,60}$)([a-z0-9-_]*\\.)*[a-z0-9-_]*@[a-z0-9]*\\.[a-z]{2,3}$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);

        Optional<User> userOptional = userService.findUserByEmail(email);

        if (!matcher.matches()){
            request.setAttribute("error", "format");
        } else if(userOptional.isEmpty()) {
            request.setAttribute("error", "empty");
        }

        if (matcher.matches() && userOptional.isPresent()){
            userOptional.ifPresent(emailService::sendUserPasswordResetEmail);
            request.setAttribute("success", "sent");
        }

        return "password_reset/request";
    }

    @GetMapping("/form")
    public String passwordResetForm(@RequestParam String dta){
        Optional<Token> tokenOptional = tokenService.findTokenByData(dta);

        if (tokenOptional.isPresent()){
            return "password_reset/form";
        }
        return "redirect:/";
    }

    @PostMapping("/form")
    public String passwordResetForm(@RequestParam String password, @RequestParam String confirmPassword){


        return "redirect:/login";
    }
}
