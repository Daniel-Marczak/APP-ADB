package pl.danielmarczak.adb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.server.csrf.CookieServerCsrfTokenRepository;
import pl.danielmarczak.adb.handler.CustomAuthenticationSuccessHandler;
import pl.danielmarczak.adb.service.impl.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
//                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//                    .ignoringAntMatchers("/test/**")
//                .and()
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers("reset-password").permitAll()
                .antMatchers("/registration").permitAll()
                .antMatchers("/user/**").hasRole("USER")
                .antMatchers("/properties/**").hasRole("USER")
                .antMatchers("/admin/**").hasAnyRole("ADMIN", "EL_PATRON")
                .antMatchers("/api/property/**").hasAnyRole("USER", "ADMIN", "EL_PATRON")
                .and()
                .formLogin()
                    .loginPage("/login")
                    .successHandler(new CustomAuthenticationSuccessHandler())
                    .failureUrl("/login?error=credentials")
                .and()
                .logout()
                    .clearAuthentication(true)
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID")
                    .logoutSuccessUrl("/login")

        ;

    }

    @Bean
    public UserDetailsServiceImpl customUserDetailsService() {
        return new UserDetailsServiceImpl();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
