package pl.danielmarczak.adb.service.impl;

import org.springframework.stereotype.Service;
import pl.danielmarczak.adb.entity.RateType;
import pl.danielmarczak.adb.repository.RateTypeRepository;
import pl.danielmarczak.adb.service.RateTypeService;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class RateTypeServiceImpl implements RateTypeService {

    private final RateTypeRepository rateTypeRepository;

    public RateTypeServiceImpl(RateTypeRepository rateTypeRepository) {
        this.rateTypeRepository = rateTypeRepository;
    }

    @Override
    public List<RateType> getAllRateTypes() {
        return rateTypeRepository.findAll();
    }

    @Override
    public RateType findRateTypeById(Long rateTypeId) {
        return rateTypeRepository.findById(rateTypeId).orElse(new RateType());
    }
}
