package com.labareda.api.dto.client;


import com.labareda.api.domain.model.Client;

import java.math.BigDecimal;

public record ClientResponseDTO(
        Long id, String name, BigDecimal unitPrice
) {
    public static ClientResponseDTO fromEntity(Client client) {
        return new ClientResponseDTO(client.getId(), client.getName(), client.getUnitPrice());
    }
}
