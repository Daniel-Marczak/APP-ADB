package pl.danielmarczak.adb.service.impl;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.Country;
import pl.danielmarczak.adb.repository.CountryRepository;
import pl.danielmarczak.adb.service.CountryService;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CountryServiceImpl implements CountryService {

    private final CountryRepository countryRepository;

    public CountryServiceImpl(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    @Override
    public Country findCountryById(Long countryId) {
        return countryRepository.findById(countryId).orElse(new Country()); //TODO
    }
}
