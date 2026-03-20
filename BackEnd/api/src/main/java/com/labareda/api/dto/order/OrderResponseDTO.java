package com.labareda.api.dto.order;

import com.labareda.api.domain.model.Order;

import java.math.BigDecimal;
import java.time.LocalDate;

public record OrderResponseDTO(
        Long id,
        Long companyId,
        Long clientId,
        LocalDate date,
        int quantity,
        BigDecimal totalValue
) {
    public static OrderResponseDTO fromEntity(Order order) {
        return new OrderResponseDTO(order.getId(), order.getCompany().getId(),
                order.getClient().getId(), order.getDate(), order.getQuantity(), order.getTotalValue());
    }
}
