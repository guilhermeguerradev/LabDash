package com.labareda.api.dto.company;

import jakarta.validation.constraints.NotBlank;

public record CompanyRequestDTO(
        @NotBlank String name
) {
}
