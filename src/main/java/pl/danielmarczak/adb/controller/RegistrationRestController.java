package pl.danielmarczak.adb.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.danielmarczak.adb.service.UserService;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/registration")
public class RegistrationRestController {

    private final UserService userService;

    public RegistrationRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/is-username-available")
    public boolean isUsernameAvailable(@RequestParam String username){
        String USERNAME_REGEX = "^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,13}[a-zA-Z0-9]$";
        Pattern pattern = Pattern.compile(USERNAME_REGEX);
        Matcher matcher = pattern.matcher(username);
        if (matcher.matches()) {
            return !userService.checkDatabaseContainsUsername(username);
        } else {
            return false;
        }
    }

    @GetMapping("/is-email-available")
    public boolean isEmailAvailable(@RequestParam String email){
        String EMAIL_REGEX = "^(?=.{5,60}$)([a-z0-9-_]*\\.)*[a-z0-9-_]*@[a-z0-9]*\\.[a-z]{2,3}$";
        Pattern pattern = Pattern.compile(EMAIL_REGEX);
        Matcher matcher = pattern.matcher(email);
        if (matcher.matches()) {
            return !userService.checkDatabaseContainsEmail(email);
        } else {
            return false;
        }

    }
}
