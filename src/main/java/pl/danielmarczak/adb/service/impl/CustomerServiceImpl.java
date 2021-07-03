package pl.danielmarczak.adb.service.impl;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.Customer;
import pl.danielmarczak.adb.model.EventForm;
import pl.danielmarczak.adb.repository.CustomerRepository;
import pl.danielmarczak.adb.service.CustomerService;

import javax.transaction.Transactional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public Customer createCustomerFromEventFormData(EventForm eventForm) {
        Customer customer = new Customer();
        customer.setCustomerName(eventForm.getCustomerName());
        customer.setCustomerSurname(eventForm.getCustomerSurname());
        customer.setCustomerPhone(eventForm.getCustomerPhone());

        return customer;
    }
}
