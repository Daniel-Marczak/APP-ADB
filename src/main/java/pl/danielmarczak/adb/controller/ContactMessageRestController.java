package pl.danielmarczak.adb.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.danielmarczak.adb.entity.ContactMessage;
import pl.danielmarczak.adb.service.ContactMessageService;

@RestController()
@RequestMapping("/contact-message")
public class ContactMessageRestController {

    private final ContactMessageService contactMessageService;

    public ContactMessageRestController(ContactMessageService contactMessageService) {
        this.contactMessageService = contactMessageService;
    }


    @PostMapping("/save")
    public Boolean saveContactMessage(@RequestParam String name, @RequestParam String email, @RequestParam String text){
        ContactMessage contactMessage = contactMessageService.save(name, email, text);
        return contactMessage.getId() != null;
    }

}
