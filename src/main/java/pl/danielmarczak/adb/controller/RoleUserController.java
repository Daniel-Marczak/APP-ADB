package pl.danielmarczak.adb.controller;


import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import pl.danielmarczak.adb.entity.CurrentUser;
import pl.danielmarczak.adb.entity.User;
import pl.danielmarczak.adb.service.EmailService;
import pl.danielmarczak.adb.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.Optional;

@Controller
@RequestMapping("/user")
public class RoleUserController {

    private final UserService userService;
    private final EmailService emailService;

    public RoleUserController(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
    }

    @GetMapping("/update")
    public String updateUser(Model model, HttpServletRequest request, @AuthenticationPrincipal CurrentUser currentUser){
        User user = currentUser.getUser();
        model.addAttribute("user", user);
        request.setAttribute("currentUsername", user.getUsername());
        request.setAttribute("currentEmail", user.getEmail());
        request.setAttribute("currentNumber", user.getContactNumber());

        return "role_user/update";
    }

    @PostMapping("/update")
    public String updateUser(
            @ModelAttribute("user") @Valid User user, BindingResult bindingResult, @AuthenticationPrincipal CurrentUser currentUser,
            HttpServletRequest request, HttpSession session
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

        boolean isEmailAvailable = userService.isEmailAvailable(user.getEmail());
        boolean isUsernameAvailable = userService.isUsernameAvailable(user.getUsername());
        boolean isUserEmail = user.getEmail().equals(currentUser.getUser().getEmail());
        boolean isUserUsername = user.getUsername().equals(currentUser.getUser().getUsername());

        if (!isEmailAvailable && !isUserEmail || !isUsernameAvailable && !isUserUsername || !user.getPassword().equals(user.getConfPassword())){
            if (!isEmailAvailable && !isUserEmail){
                bindingResult.addError(new FieldError("user", "email", "This email has already been taken."));
            }
            if (!isUsernameAvailable && !isUserUsername) {
                bindingResult.addError(new FieldError("user", "username", "This username has already been taken."));
            }
            if (!user.getPassword().equals(user.getConfPassword())) {
                bindingResult.addError(new FieldError("user", "confPassword", "Passwords do not match."));
            }
            return "role_user/update";
        }

        if (bindingResult.getFieldErrorCount() == 1 && isPasswordEmpty || !bindingResult.hasErrors() ) {
            User dbUser = userService.updateUser(user,currentUser);
            if (!user.getEmail().equals(currentUser.getUser().getEmail())){
                emailService.sendUserEmailUpdateEmail(dbUser);
                session.invalidate();
            }
            return "redirect:/user/update?update=success";
        }
        else if (bindingResult.getFieldErrorCount() > 0 && !isPasswordEmpty){
            request.setAttribute("error", "password");
            return "role_user/update";
        }
        else if (bindingResult.getFieldErrorCount() > 0 && isPasswordEmpty){
            return "role_user/update";
        }

        return "redirect:/user/update?update=success";
    }
}
