package com.labareda.api.domain.service;


import com.labareda.api.domain.model.DailyCounterSale;
import com.labareda.api.domain.repository.DailyCounterSaleRepository;
import com.labareda.api.dto.dailyCounterSale.DailyCounterSaleRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DailyCounterSaleService {

    private final DailyCounterSaleRepository repository;

    public DailyCounterSale save(DailyCounterSaleRequestDTO dto) {

        repository.findByDate(dto.date())
                .ifPresent(c -> { throw new RuntimeException("Venda já cadastrada!");});

        DailyCounterSale sale  = new DailyCounterSale();

        sale.setDate(dto.date());
        sale.setCardAmount(dto.cardAmount());
        sale.setCashAmount(dto.cashAmount());
        sale.setPixAmount(dto.pixAmount());

        return repository.save(sale);
    }

    public Page<DailyCounterSale> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public DailyCounterSale findByIdOrThrow(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venda não encontrada!"));
    }

    public DailyCounterSale findByDate(LocalDate date) {
        return repository.findByDate(date)
                .orElseThrow(() -> new RuntimeException("Venda não encontrada"));
    }

    public List<DailyCounterSale> findByPeriod(LocalDate startDate, LocalDate endDate) {
        return repository.findByDateBetween(startDate, endDate);
    }

    public DailyCounterSale update(Long id,DailyCounterSaleRequestDTO dto) {
        DailyCounterSale sale = findByIdOrThrow(id);

        sale.setDate(dto.date());
        sale.setCardAmount(dto.cardAmount());
        sale.setCashAmount(dto.cashAmount());
        sale.setPixAmount(dto.pixAmount());

        return repository.save(sale);
    }

    public void delete(Long id) {
        if(!repository.existsById(id)) {
            throw new RuntimeException("Venda não encontrada!");
        }
        repository.deleteById(id);
    }

}
