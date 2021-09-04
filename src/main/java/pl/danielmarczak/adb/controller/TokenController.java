package pl.danielmarczak.adb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import pl.danielmarczak.adb.entity.Token;
import pl.danielmarczak.adb.enums.TokenTypeEnum;
import pl.danielmarczak.adb.service.TokenService;
import pl.danielmarczak.adb.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.Optional;

@Controller
@RequestMapping("/token")
public class TokenController {

    private final TokenService tokenService;
    private final UserService userService;

    public TokenController(TokenService tokenService, UserService userService) {
        this.tokenService = tokenService;
        this.userService = userService;
    }


    @GetMapping(value = "/validation")
    public String validateToken(@RequestParam(name = "dta", required = false) String dta, HttpServletRequest request) {
        Optional<Token> tokenOptional = tokenService.findTokenByData(dta);
        if (tokenOptional.isPresent()) {
            Token token = tokenOptional.get();
            if (LocalDateTime.now().withNano(0).isBefore(token.getExpiresAt()) && token.getConfirmedAt() == null) {
                token.setConfirmedAt(LocalDateTime.now().withNano(0));
                if (token.getType() == TokenTypeEnum.USER_REGISTRATION) {
                    userService.setUserIsEnabled(true, token.getUser().getId());
                    request.setAttribute("validation", "registrationSuccess");
                } else if(token.getType() == TokenTypeEnum.USER_EMAIL_UPDATE) {
                    userService.setUserIsEnabled(true, token.getUser().getId());
                    request.setAttribute("validation", "updateSuccess");
                } else if (token.getType() == TokenTypeEnum.USER_PASSWORD_RESET){
                    return "redirect:/password-reset/form?dta=" + token.getData();
                }
            } else if (!LocalDateTime.now().withNano(0).isBefore(token.getExpiresAt()) && token.getConfirmedAt() == null) {
                request.setAttribute("token", "expired");
                tokenService.deleteToken(token);
                userService.deleteUser(token.getUser());
            } else if (token.getConfirmedAt() != null) {
                request.setAttribute("token", "confirmed");
            }
        } else {
            request.setAttribute("token", "empty");
        }
        return "token-validation";
    }


}
