package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.ContactMessage;

public interface ContactMessageService {

    ContactMessage save(String name, String email, String message);

}
