package pl.danielmarczak.adb.controller;


import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import pl.danielmarczak.adb.entity.CurrentUser;
import pl.danielmarczak.adb.entity.User;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/user")
public class RoleUserController {

    @GetMapping("/update")
    public String updateUser(Model model, HttpSession session, HttpServletRequest request){
        User user = (User) session.getAttribute("user");
        model.addAttribute("user", user);
        request.setAttribute("username", user.getUsername());
        request.setAttribute("email", user.getEmail());
        request.setAttribute("number", user.getContactNumber());

        return "role_user/update";
    }

    @PostMapping("/update")
    public String updateUser(
            @ModelAttribute("user") @Valid User user, BindingResult bindingResult, @AuthenticationPrincipal CurrentUser currentUser,
            @RequestParam String confirmPassword, HttpServletRequest request
    ){
        Optional<FieldError> passwordFieldErrorOptional = Optional.ofNullable(bindingResult.getFieldError("password"));
        boolean isPasswordEmpty = false;

        if (passwordFieldErrorOptional.isPresent()){
            String rejectedValue = (String)passwordFieldErrorOptional.get().getRejectedValue();
            assert rejectedValue != null;
            if(rejectedValue.equals("")){
                isPasswordEmpty = true;
            }
        }

        List<FieldError> fieldErrors = bindingResult.getFieldErrors();
        for (FieldError fieldError : fieldErrors) {
            if (!fieldError.getField().equals("password")) {
                return "role_user/update";
            }
            if (fieldError.getField().equals("password") && !isPasswordEmpty) {
                return "role_user/update";
            }
        }

        //todo empty password error

        return "redirect:/user/update?update=success"; //
    }
}
