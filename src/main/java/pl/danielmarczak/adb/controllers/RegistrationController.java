package pl.danielmarczak.adb.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import pl.danielmarczak.adb.entities.User;

@Controller
public class RegistrationController {

    @GetMapping("/registration")
    public String registrationGet(Model model){
        model.addAttribute("newUser", new User());
        return "registration";
    }

}
