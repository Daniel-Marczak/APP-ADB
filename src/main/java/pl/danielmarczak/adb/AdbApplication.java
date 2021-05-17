package pl.danielmarczak.adb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "pl.danielmarczak.adb")
public class AdbApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdbApplication.class, args);
    }

}
