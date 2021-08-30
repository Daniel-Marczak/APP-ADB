package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.Price;

public interface PriceService {

    void savePrice(Price price);
    Price getPriceById(Long priceId);

}
