package com.labareda.api.dto.auth;

public record AuthResponseDTO(
        String token,
        String name,
        String role
) {
}
