package pl.danielmarczak.adb.controller;

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

import javax.validation.Valid;

@Controller
@RequestMapping("/registration")
public class RegistrationController {

    private final RestTemplate restTemplate;
    private final RegistrationService registrationService;

    public RegistrationController(RestTemplate restTemplate, RegistrationService registrationService) {
        this.restTemplate = restTemplate;
        this.registrationService = registrationService;
    }

    @GetMapping
    public String showRegistrationForm(Model model){
        model.addAttribute("newUser", new User());
        return "registration";
    }

    @PostMapping
    public String processRegistrationForm(
            @ModelAttribute("newUser") @Valid User newUser, BindingResult result,
            @RequestParam(name = "g-recaptcha-response") String recaptchaResponse,
            @RequestParam String confirmPassword
    ){
        String url = "https://www.google.com/recaptcha/api/siteverify";
        String params = "?secret=6LeK3OkaAAAAAG3u4n12ei20nI4gvqaPbWRw6aq9&response=" + recaptchaResponse;
        ReCaptchaResponse reCaptchaResponse = restTemplate.exchange(url+params, HttpMethod.POST, null, ReCaptchaResponse.class).getBody();

        if (reCaptchaResponse.isSuccess()){
            if (!newUser.getPassword().equals(confirmPassword)){
                result.addError(new FieldError(
                        "newUser",
                        "password",
                        "This email address has already been taken."
                ));
                return "/registration";
            }

            if (result.hasErrors()){
                return "/registration";
            }

            registrationService.registerNewUser(newUser);
            return "redirect:/registration?success";
        } else {

            return "redirect:/registration?failure";
        }
    }

}
