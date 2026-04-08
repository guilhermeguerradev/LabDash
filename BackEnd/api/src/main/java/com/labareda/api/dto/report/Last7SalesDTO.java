package com.labareda.api.dto.report;

import java.time.LocalDate;
import java.util.List;

public record Last7SalesDTO(
        LocalDate startDate,
        LocalDate endDate,
        int totalSales,
        List<DailyTotalDTO> sales
) {
}
