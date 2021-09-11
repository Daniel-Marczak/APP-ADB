package pl.danielmarczak.adb.service.impl;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.ContactMessage;
import pl.danielmarczak.adb.repository.ContactMessageRepository;
import pl.danielmarczak.adb.service.ContactMessageService;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@Transactional
public class ContactMessageServiceImpl implements ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageServiceImpl(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    @Override
    public ContactMessage save(String name, String email, String message) {
        ContactMessage contactMessage = new ContactMessage();
        contactMessage.setName(name);
        contactMessage.setEmail(email);
        contactMessage.setText(message);
        contactMessage.setDateSent(LocalDateTime.now().withNano(0));
        contactMessage.setIsRead(false);
        contactMessage.setIsArchived(false);
        return contactMessageRepository.save(contactMessage);
    }
}
