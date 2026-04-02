package com.labareda.api.dto.user;

import com.labareda.api.domain.model.enums.UserRole;
import jakarta.validation.constraints.Size;

public record UserRequestDTO(
        String name,
        String email,
        @Size(min = 6, message = "Senha deve ter ao menos 6 caracteres") String password,
        UserRole role
) { }
