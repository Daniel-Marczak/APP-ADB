package pl.danielmarczak.adb.service.impl;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.CurrentUser;
import pl.danielmarczak.adb.entity.Token;
import pl.danielmarczak.adb.entity.User;
import pl.danielmarczak.adb.enums.TokenTypeEnum;
import pl.danielmarczak.adb.model.EmailContent;
import pl.danielmarczak.adb.repository.UserRepository;
import pl.danielmarczak.adb.service.EmailService;
import pl.danielmarczak.adb.service.RoleService;
import pl.danielmarczak.adb.service.TokenService;
import pl.danielmarczak.adb.service.UserService;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final TokenService tokenService;

    public UserServiceImpl(UserRepository userRepository, RoleService roleService, BCryptPasswordEncoder passwordEncoder, EmailService emailService, TokenService tokenService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.tokenService = tokenService;
    }

    @Override
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEnabled(false);
        user.setRole(roleService.findRoleById(3));
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public boolean checkDatabaseContainsUsername(String username) {
        return userRepository.findFirstByUsername(username).isPresent();
    }

    @Override
    public boolean checkDatabaseContainsEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }

    @Override
    public User findUserByUsername(String username) {
        return userRepository.findUserByUsername(username).orElse(new User());
    }

    @Override
    public User findUserById(Long userId) {
        return userRepository.findById(userId).orElse(new User());
    }

    @Override
    public void setUserIsEnabled(boolean isEnabled, Long userId) {
        userRepository.setUserIsEnabled(isEnabled, userId);
    }

    @Override
    public Boolean isEmailAvailable(String email) {
        return userRepository.findFirstByEmail(email).isEmpty();
    }

    @Override
    public Boolean isUsernameAvailable(String username) {
        return userRepository.findUserByUsername(username).isEmpty();
    }

    @Override
    public void updateUser(User user, CurrentUser currentUser, HttpSession session) {
        User dbUser = userRepository.getOne(currentUser.getUser().getId());
        dbUser.setUsername(user.getUsername());
        dbUser.setEmail(user.getEmail());
        dbUser.setContactNumber(user.getContactNumber());

        if (!user.getPassword().equals("")){
            dbUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        if (!user.getEmail().equals(currentUser.getUser().getEmail())){
            dbUser.setEnabled(false);
            EmailContent emailContent = new EmailContent();
            emailContent.setSubject("Change of the email address associated with your account");
            emailContent.setContentHeader("Reactivate your account.");
            emailContent.setContentBody(
                    "To reactivate your account you need to verify your new email address " +
                    "by clicking on the reactivation button below."
            );
            Token token = tokenService.createToken(dbUser, TokenTypeEnum.USER_EMAIL_UPDATE);
            emailService.sendEmail(token, emailContent);

            session.invalidate();
        }
    }


}
