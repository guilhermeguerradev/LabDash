package com.labareda.api.dto.report;

import java.math.BigDecimal;
import java.time.LocalDate;

public record FinancialReportDTO(
        LocalDate startDate,
        LocalDate endDate,
        int totalDays,
        BigDecimal totalOrders,
        BigDecimal totalSales,
        BigDecimal totalRevenue
) {
    public static FinancialReportDTO fromEntity(LocalDate startDate, LocalDate endDate, int totalDays, BigDecimal totalOrders, BigDecimal totalSales, BigDecimal totalRevenue) {
        return new FinancialReportDTO(startDate,endDate,totalDays,totalOrders,totalSales,totalRevenue);
    }
}
