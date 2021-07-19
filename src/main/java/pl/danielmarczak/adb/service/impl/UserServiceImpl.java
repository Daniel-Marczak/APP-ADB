package pl.danielmarczak.adb.service.impl;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.User;
import pl.danielmarczak.adb.repository.UserRepository;
import pl.danielmarczak.adb.service.RoleService;
import pl.danielmarczak.adb.service.UserService;

import javax.transaction.Transactional;

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
        user.setRole(roleService.findRoleById(3));
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public User findFirstByUsername(String username) {
        return userRepository.findFirstByUsername(username).orElse(new User());
    }

    @Override
    public User findFirstByEmail(String email) {
        return userRepository.findFirstByEmail(email).orElse(new User());
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
}
