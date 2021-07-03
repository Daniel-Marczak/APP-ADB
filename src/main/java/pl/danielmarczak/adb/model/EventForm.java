package pl.danielmarczak.adb.model;

import lombok.Data;

@Data
public class EventForm {

    private String tittle;
    private String customerName;
    private String customerSurname;
    private String customerPhone;
    private String additionalInfo;
    private String start;
    private String end;
    private String calendarId;

}
