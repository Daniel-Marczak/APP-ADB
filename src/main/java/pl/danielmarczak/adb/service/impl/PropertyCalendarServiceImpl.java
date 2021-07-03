package pl.danielmarczak.adb.service.impl;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.PropertyCalendar;
import pl.danielmarczak.adb.repository.PropertyCalendarRepository;
import pl.danielmarczak.adb.service.PropertyCalendarService;

import javax.transaction.Transactional;

@Service
@Transactional
public class PropertyCalendarServiceImpl implements PropertyCalendarService {

    private final PropertyCalendarRepository propertyCalendarRepository;

    public PropertyCalendarServiceImpl(PropertyCalendarRepository propertyCalendarRepository) {
        this.propertyCalendarRepository = propertyCalendarRepository;
    }

    @Override
    public PropertyCalendar getOnePropertyCalendarById(Long propertyCalendarId) {
        return propertyCalendarRepository.getOne(propertyCalendarId);
    }
}
