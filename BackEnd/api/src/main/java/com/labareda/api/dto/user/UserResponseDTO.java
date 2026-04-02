package com.labareda.api.dto.user;

import com.labareda.api.domain.model.User;
import com.labareda.api.domain.model.enums.UserRole;
import jakarta.validation.constraints.NotNull;

public record UserResponseDTO(
        Long id,
        String name,
        String email,
        @NotNull UserRole role


) {
    public static UserResponseDTO fromEntity(User user) {
        return new UserResponseDTO(user.getId(), user.getName(), user.getEmail(), user.getRole());
    }
}
