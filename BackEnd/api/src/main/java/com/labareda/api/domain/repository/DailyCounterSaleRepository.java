package com.labareda.api.domain.repository;

import com.labareda.api.domain.model.DailyCounterSale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface DailyCounterSaleRepository extends JpaRepository<DailyCounterSale, Long> {
    Optional<DailyCounterSale> findByDate(LocalDate date);
}
