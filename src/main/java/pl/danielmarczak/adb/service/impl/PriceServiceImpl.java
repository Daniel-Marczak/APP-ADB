package pl.danielmarczak.adb.service.impl;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.Price;
import pl.danielmarczak.adb.repository.PriceRepository;
import pl.danielmarczak.adb.service.PriceService;

import javax.transaction.Transactional;

@Service
@Transactional
public class PriceServiceImpl implements PriceService {

    private final PriceRepository priceRepository;

    public PriceServiceImpl(PriceRepository priceRepository) {
        this.priceRepository = priceRepository;
    }

    @Override
    public void savePrice(Price price) {
        priceRepository.save(price);
    }

    @Override
    public Price getPriceById(Long priceId) {
        return priceRepository.getOne(priceId);
    }
}
