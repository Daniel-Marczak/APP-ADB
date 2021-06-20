package pl.danielmarczak.adb.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.danielmarczak.adb.entity.CurrentUser;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/user")
public class RoleUserController {

    @GetMapping("/properties")
    public String showUserProperties(@AuthenticationPrincipal CurrentUser currentUser, HttpServletRequest request){
        request.setAttribute("userId", currentUser.getUser().getId());
        return "role_user/properties";
    }

}
