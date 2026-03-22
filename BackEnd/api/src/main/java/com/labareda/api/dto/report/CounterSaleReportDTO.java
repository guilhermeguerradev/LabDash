package com.labareda.api.dto.report;

import com.labareda.api.domain.model.DailyCounterSale;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record CounterSaleReportDTO(

        LocalDate startDate,
        LocalDate endDate,
        int totalDays,
        int totalCounterSales,
        BigDecimal totalValue,
        List<DailyCounterSale> sales
) {
    public static CounterSaleReportDTO fromEntity(LocalDate startDate, LocalDate endDate, int totalDays,
                                int totalCounterSales, BigDecimal totalValue, List<DailyCounterSale> sales) {
        return new CounterSaleReportDTO(
                startDate,
                endDate,
                totalDays,
                totalCounterSales,
                totalValue,
                sales
        );
    }
}
