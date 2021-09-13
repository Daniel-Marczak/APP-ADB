package pl.danielmarczak.adb.service.impl;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.CurrentUser;
import pl.danielmarczak.adb.entity.User;
import pl.danielmarczak.adb.repository.UserRepository;
import pl.danielmarczak.adb.service.RoleService;
import pl.danielmarczak.adb.service.UserService;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleService roleService, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEnabled(false);
        user.setRole(roleService.findRoleById(2));
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
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findFirstByEmail(email);
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
    public User updateUser(User user, CurrentUser currentUser) {
        User dbUser = userRepository.getOne(currentUser.getUser().getId());
        dbUser.setUsername(user.getUsername());
        dbUser.setEmail(user.getEmail());
        dbUser.setContactNumber(user.getContactNumber());

        if (!user.getPassword().equals("")){
            dbUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        if (!user.getEmail().equals(currentUser.getUser().getEmail())){
            dbUser.setEnabled(false);
        }
        return dbUser;
    }

    @Override
    public void setUserPassword(String password, Long userId) {
        userRepository.setUserPassword(passwordEncoder.encode(password), userId);
    }


}
