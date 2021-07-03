package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.Customer;
import pl.danielmarczak.adb.model.EventForm;

public interface CustomerService {

    Customer saveCustomer(Customer customer);

    Customer createCustomerFromEventFormData(EventForm eventForm);
}
