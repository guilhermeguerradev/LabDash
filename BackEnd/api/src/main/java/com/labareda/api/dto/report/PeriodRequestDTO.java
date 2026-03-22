package com.labareda.api.dto.report;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record PeriodRequestDTO(
        @JsonFormat(pattern = "dd/MM/yyyy")
        @NotNull LocalDate startDate,

        @JsonFormat(pattern = "dd/MM/yyyy")
        @NotNull LocalDate endDate
) { }
