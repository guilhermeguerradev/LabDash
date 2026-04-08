package com.labareda.api.dto.report;

import java.math.BigDecimal;
import java.time.LocalDate;

public record DailyTotalDTO(
        LocalDate date,
        BigDecimal totalValue
) {
}
