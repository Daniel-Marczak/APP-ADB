package pl.danielmarczak.adb.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@ComponentScan("pl.danielmarczak")
@Configuration
public class WebAppConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
        registry.addViewController("/sign-in").setViewName("login");
        registry.addViewController("/registration").setViewName("registration");
        registry.addViewController("/forgot-password").setViewName("forgot-password");
    }


}
