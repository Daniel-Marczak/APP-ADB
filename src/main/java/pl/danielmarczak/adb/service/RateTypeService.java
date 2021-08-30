package pl.danielmarczak.adb.service;

import pl.danielmarczak.adb.entity.RateType;

import java.util.List;

public interface RateTypeService {

    List<RateType> getAllRateTypes();

    RateType findRateTypeById(Long rateTypeId);
}
