package com.labareda.api.dto.report;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record Last7OrdersDTO(
        LocalDate startDate,
        LocalDate endDate,
        int totalOrders,
        List<DailyTotalDTO> orders
) {
}
