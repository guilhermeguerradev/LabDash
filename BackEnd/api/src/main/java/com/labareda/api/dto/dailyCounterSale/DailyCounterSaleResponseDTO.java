package com.labareda.api.dto.dailyCounterSale;

import com.labareda.api.domain.model.DailyCounterSale;

import java.math.BigDecimal;
import java.time.LocalDate;

public record DailyCounterSaleResponseDTO(
        Long id,
        BigDecimal pixAmount,
        BigDecimal cashAmount,
        BigDecimal cardAmount,
        BigDecimal totalDay,
        LocalDate date
) {
    public static DailyCounterSaleResponseDTO fromEntity(DailyCounterSale dailyCounterSale) {
        return new DailyCounterSaleResponseDTO(dailyCounterSale.getId(), dailyCounterSale.getPixAmount(),
                dailyCounterSale.getCashAmount(),dailyCounterSale.getCardAmount(),dailyCounterSale.getTotalDay(),
                dailyCounterSale.getDate());
    }
}
