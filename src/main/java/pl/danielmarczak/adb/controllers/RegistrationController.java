package pl.danielmarczak.adb.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import pl.danielmarczak.adb.entities.User;
import pl.danielmarczak.adb.recaptcha.ReCaptchaResponse;

@Controller
public class RegistrationController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/registration")
    public String registrationGet(Model model){
        model.addAttribute("newUser", new User());
        return "registration";
    }

    @PostMapping("/registration")
    @ResponseBody
    public String registrationPost(@ModelAttribute("newUser") User newUser, @RequestParam(name = "g-recaptcha-response") String recaptchaResponse){
        String url = "https://www.google.com/recaptcha/api/siteverify";
        String params = "?secret=6LeK3OkaAAAAAG3u4n12ei20nI4gvqaPbWRw6aq9&response=" + recaptchaResponse;
        System.out.println(recaptchaResponse);

        ReCaptchaResponse reCaptchaResponse = restTemplate.exchange(url+params, HttpMethod.POST, null, ReCaptchaResponse.class).getBody();

        if (reCaptchaResponse.isSuccess()){
            return "success";
        } else {
            return "failure";
        }

//        return "registration";
    }

}
