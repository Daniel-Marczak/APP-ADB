package pl.danielmarczak.adb.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import pl.danielmarczak.adb.entities.User;
import pl.danielmarczak.adb.recaptcha.ReCaptchaResponse;
import pl.danielmarczak.adb.repositories.UserRepository;

import javax.validation.Valid;

@Controller
public class RegistrationController {

    @Autowired
    private RestTemplate restTemplate;

    private final UserRepository userRepository;

    public RegistrationController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/registration")
    public String registrationGet(Model model){
        model.addAttribute("newUser", new User());
        return "registration";
    }

    @PostMapping("/registration")
//    @ResponseBody
    public String registrationPost(@ModelAttribute("newUser") @Valid User newUser, BindingResult result, @RequestParam(name = "g-recaptcha-response") String recaptchaResponse,
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
                        "Adres e-mail jest już zajęty."
                ));
                return "/registration";
            }
            if (result.hasErrors()){
                return "/registration";
            }
            System.out.println(newUser);
            userRepository.save(newUser);
            return "redirect:/registration?success";
        } else {
            return "redirect:/registration?failure";
        }



//        return "registration";
    }

}
