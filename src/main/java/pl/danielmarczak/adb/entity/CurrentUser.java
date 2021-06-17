package pl.danielmarczak.adb.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class CurrentUser extends User {

    private final pl.danielmarczak.adb.entity.User user;

    public CurrentUser(String username, String password, Collection<? extends GrantedAuthority> authorities, pl.danielmarczak.adb.entity.User user) {
        super(username, password, authorities);
        this.user = user;
    }

    public pl.danielmarczak.adb.entity.User getUser(){
        return user;
    }
}
