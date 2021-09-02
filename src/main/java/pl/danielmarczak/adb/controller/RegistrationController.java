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
import pl.danielmarczak.adb.entity.User;
import pl.danielmarczak.adb.recaptcha.ReCaptchaResponse;
import pl.danielmarczak.adb.service.RegistrationService;
import pl.danielmarczak.adb.service.UserService;

import javax.validation.Valid;

@Controller
@RequestMapping("/registration")
public class RegistrationController {

    protected Log logger = LogFactory.getLog(this.getClass());
    private final RestTemplate restTemplate;
    private final RegistrationService registrationService;
    private final UserService userService;

    public RegistrationController(RestTemplate restTemplate, RegistrationService registrationService, UserService userService) {
        this.restTemplate = restTemplate;
        this.registrationService = registrationService;
        this.userService = userService;
    }

    @GetMapping
    public String showRegistrationForm(Model model) {
        model.addAttribute("user", new User());
        return "registration";
    }

    @PostMapping
    public String processRegistrationForm(
            @ModelAttribute("user") @Valid User user, BindingResult bindingResult,
            @RequestParam(name = "g-recaptcha-response") String recaptchaResponse
    ) {
        String url = "https://www.google.com/recaptcha/api/siteverify";
        String params = "?secret=6LeK3OkaAAAAAG3u4n12ei20nI4gvqaPbWRw6aq9&response=" + recaptchaResponse;
        ReCaptchaResponse reCaptchaResponse = restTemplate.exchange(url + params, HttpMethod.POST, null, ReCaptchaResponse.class).getBody();

        assert reCaptchaResponse != null;
        if (reCaptchaResponse.isSuccess()) {
            if (bindingResult.hasErrors()) {
                return "registration";
            }
            if (!user.getPassword().equals(user.getConfPassword())) {
                bindingResult.addError(new FieldError("user", "password", "The passwords do not match."));
                return "registration";
            }

            boolean isEmailAvailable = userService.isEmailAvailable(user.getEmail());
            boolean isUsernameAvailable = userService.isUsernameAvailable(user.getUsername());

            if (!isEmailAvailable || !isUsernameAvailable){
                if (!isEmailAvailable){
                    bindingResult.addError(new FieldError("user", "email", "This email has already been taken."));
                }
                if (!isUsernameAvailable) {
                    bindingResult.addError(new FieldError("user", "username", "This username has already been taken."));
                }
                return "registration";
            }

            registrationService.registerUserAndSendERegistrationEmail(user);
            return "redirect:/registration?reg=success";

        } else {
            return "registration";
        }
    }

}
