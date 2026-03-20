package com.labareda.api.dto.dailyCounterSale;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;
import java.time.LocalDate;

public record DailyCounterSaleRequestDTO(

        @NotNull @PositiveOrZero BigDecimal pixAmount,
        @NotNull @PositiveOrZero  BigDecimal cashAmount,
        @NotNull @PositiveOrZero  BigDecimal cardAmount,
        @NotNull LocalDate date
) {
}
