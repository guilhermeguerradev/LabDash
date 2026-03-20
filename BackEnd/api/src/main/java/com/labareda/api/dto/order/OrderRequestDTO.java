package com.labareda.api.dto.order;

import com.labareda.api.domain.model.Client;
import com.labareda.api.domain.model.Company;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public record OrderRequestDTO(
        @NotNull LocalDate date,
        @NotNull Long companyId,
        @NotNull Long clientId,
        @NotNull @Positive int quantity
) {
}
