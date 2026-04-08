package com.labareda.api.dto.report;

import com.labareda.api.domain.model.Order;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record OrderReportDTO(
        LocalDate startDate,
        LocalDate endDate,
        int totalDays,
        int totalOrders,
        BigDecimal totalValue,
        List<Order> orders
) {
    public static OrderReportDTO fromEntity(LocalDate startDate, LocalDate endDate, int totalDays, int totalOrders, BigDecimal totalValue, List<Order> orders) {
        return new OrderReportDTO(
                startDate,
                endDate,
                totalDays,
                totalOrders,
                totalValue,
                orders
        );
    }
}
