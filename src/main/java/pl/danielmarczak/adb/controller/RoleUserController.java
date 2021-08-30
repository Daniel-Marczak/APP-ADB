package pl.danielmarczak.adb.controller;


import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import pl.danielmarczak.adb.entity.CurrentUser;
import pl.danielmarczak.adb.entity.User;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@Controller
@RequestMapping("/user")
public class RoleUserController {

    @GetMapping("/update")
    public String updateUser(Model model, HttpSession session){
        User user = (User) session.getAttribute("user");
        model.addAttribute("user", user);

        return "role_user/update";
    }

    @PostMapping("/update")
    public String updateUser(
            @ModelAttribute("user") @Valid User user, BindingResult result, @AuthenticationPrincipal CurrentUser currentUser,
            @RequestParam String confirmPassword, HttpServletRequest request
    ){

        return "ok";
    }
}
