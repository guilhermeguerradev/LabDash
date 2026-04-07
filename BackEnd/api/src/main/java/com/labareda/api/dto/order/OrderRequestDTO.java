package com.labareda.api.dto.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public record OrderRequestDTO(
        @JsonFormat(pattern = "dd/MM/yyyy")
        @NotNull LocalDate date,
        @NotNull Long companyId,
        @NotNull Long clientId,
        @NotNull @Positive int quantity
) {
}
