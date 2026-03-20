package com.labareda.api.dto.client;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record ClientRequestDTO(
        @NotNull @Positive BigDecimal unitPrice,
        @NotBlank String name
) {
}
