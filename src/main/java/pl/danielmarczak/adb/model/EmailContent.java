package pl.danielmarczak.adb.model;

import lombok.Data;

@Data
public class EmailContent {

    private final String FROM = "charityapp.2021@gmail.com"; //temporary

    private String subject;
    private String contentHeader;
    private String contentBody;

}
