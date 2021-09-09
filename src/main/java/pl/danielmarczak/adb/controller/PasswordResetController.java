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
import java.time.LocalDateTime;
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

    @GetMapping("/request")
    public String passwordReset(){

        return "password_reset/request";
    }

    @PostMapping("/request")
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
            request.setAttribute("send", "success");
        }

        //todo sending error

        return "password_reset/request";
    }

    @GetMapping("/form")
    public String passwordResetForm(@RequestParam String dta, HttpServletRequest request){
        Optional<Token> tokenOptional = tokenService.findTokenByData(dta);

        if (tokenOptional.isPresent()){
            request.setAttribute("tokenId", tokenOptional.get().getId());
            request.setAttribute("userId", tokenOptional.get().getUser().getId());
            return "password_reset/form";
        }
        return "redirect:/";
    }

    @PostMapping("/form")
    public String passwordResetForm(@RequestParam Long userId, @RequestParam Long tokenId, @RequestParam String password,
                                    @RequestParam String confirmPassword, HttpServletRequest request
    ){
        String passwordRegex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])(?=\\S+$).{8,}$";
        Pattern pattern = Pattern.compile(passwordRegex);
        Matcher matcher = pattern.matcher(password);

        //todo t/c/f
        if (password.equals(confirmPassword) && matcher.matches()) {
            Optional<Token> tokenOptional = tokenService.findTokenById(tokenId);
            if (tokenOptional.isPresent()){
                tokenOptional.get().setConfirmedAt(LocalDateTime.now().withNano(0));
                tokenService.saveToken(tokenOptional.get());
                userService.setUserPassword(password, userId);
                request.setAttribute("update", "success");
            }
        } else if (password.equals(confirmPassword) && !matcher.matches()) {
            request.setAttribute("error", "format");
            request.setAttribute("tokenId", tokenId);
            request.setAttribute("userId", userId);
        } else {
            request.setAttribute("error", "confirmation");
            request.setAttribute("tokenId", tokenId);
            request.setAttribute("userId", userId);
        }

        return "password_reset/form";
    }
}
