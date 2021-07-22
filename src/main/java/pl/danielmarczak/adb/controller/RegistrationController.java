package pl.danielmarczak.adb.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import pl.danielmarczak.adb.entity.Token;
import pl.danielmarczak.adb.entity.User;
import pl.danielmarczak.adb.recaptcha.ReCaptchaResponse;
import pl.danielmarczak.adb.service.RegistrationService;
import pl.danielmarczak.adb.service.TokenService;
import pl.danielmarczak.adb.service.UserService;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.time.LocalDateTime;

@Controller
@RequestMapping("/registration")
public class RegistrationController {

    protected Log logger = LogFactory.getLog(this.getClass());
    private final RestTemplate restTemplate;
    private final RegistrationService registrationService;
    private final TokenService tokenService;
    private final UserService userService;

    public RegistrationController(RestTemplate restTemplate, RegistrationService registrationService, TokenService tokenService, UserService userService) {
        this.restTemplate = restTemplate;
        this.registrationService = registrationService;
        this.tokenService = tokenService;
        this.userService = userService;
    }

    @GetMapping
    public String showRegistrationForm(Model model) {
        model.addAttribute("newUser", new User());
        return "registration/registration";
    }

    @PostMapping
    public String processRegistrationForm(
            @ModelAttribute("newUser") @Valid User newUser, BindingResult result,
            @RequestParam(name = "g-recaptcha-response") String recaptchaResponse,
            @RequestParam String confirmPassword
    ) {
        String url = "https://www.google.com/recaptcha/api/siteverify";
        String params = "?secret=6LeK3OkaAAAAAG3u4n12ei20nI4gvqaPbWRw6aq9&response=" + recaptchaResponse;
        ReCaptchaResponse reCaptchaResponse = restTemplate.exchange(url + params, HttpMethod.POST, null, ReCaptchaResponse.class).getBody();

        if (reCaptchaResponse.isSuccess()) {
            if (!newUser.getPassword().equals(confirmPassword)) {
                result.addError(new FieldError(
                        "newUser",
                        "password",
                        "This email address has already been taken."
                ));
                return "registration?reg=failure";
            }
            if (result.hasErrors()) {
                return "registration?reg=failure";
            }

            registrationService.registerNewUserAndSendERegistrationConfirmationEmail(newUser);
            return "redirect:/registration?reg=success";

        } else {
            return "redirect:/registration?reg=failure";
        }
    }

    @GetMapping(value = "/confirmation")
    public String registrationConfirmation(@RequestParam(name = "dta", required = false) String dta, HttpServletRequest request) {

        Token token = tokenService.findTokenByData(dta);
        if (dta != null && token.getData() != null) {
            if (LocalDateTime.now().withNano(0).isBefore(token.getExpiresAt()) && token.getConfirmedAt() == null) {
                token.setConfirmedAt(LocalDateTime.now().withNano(0));
                tokenService.saveToken(token);
                userService.setUserIsEnabled(true, token.getUser().getId());
                request.setAttribute("registration", "successful");
            } else if (!LocalDateTime.now().withNano(0).isBefore(token.getExpiresAt()) && token.getConfirmedAt() == null) {
                request.setAttribute("registration", "tokenExpired");
                tokenService.deleteToken(token);
                userService.deleteUser(token.getUser());
            } else if (token.getConfirmedAt() != null) {
                request.setAttribute("registration", "alreadyConfirmed");
            }
        } else {
            request.setAttribute("registration", "emptyToken");
        }

        return "registration/registration-confirmation";
    }

}
