package com.labareda.api.domain.service;


import com.labareda.api.domain.model.DailyCounterSale;
import com.labareda.api.domain.repository.DailyCounterSaleRepository;
import com.labareda.api.dto.DailyCounterSaleRequestDTO;
import jakarta.persistence.Entity;
import lombok.RequiredArgsConstructor;

@Entity
@RequiredArgsConstructor
public class DailyCounterSaleService {

    private final DailyCounterSaleRepository repository;

    public DailyCounterSaleRequestDTO save(DailyCounterSaleRequestDTO dto) {

        repository.findByDate(dto.date()).ifPresent(c -> { throw new RuntimeException("Venda já cadastrada!");});

        DailyCounterSale sale  = new DailyCounterSale();

        // terminar
    }

}
