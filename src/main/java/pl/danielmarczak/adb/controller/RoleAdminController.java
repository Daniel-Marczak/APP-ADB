package pl.danielmarczak.adb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class RoleAdminController {

    @GetMapping("/main")
    public String showAdminMain(){

        return "role_admin/main";
    }

}
