package com.labareda.api.dto.order;

import com.labareda.api.domain.model.Order;
import java.math.BigDecimal;
import java.time.LocalDate;

public record OrderResponseDTO(
        Long id,
        Long companyId,
        String companyName,
        Long clientId,
        String clientName,
        LocalDate date,
        int quantity,
        BigDecimal totalValue
) {
    public static OrderResponseDTO fromEntity(Order order) {
        return new OrderResponseDTO(
                order.getId(),
                order.getCompany().getId(),
                order.getCompany().getName(),
                order.getClient().getId(),
                order.getClient().getName(),
                order.getDate(),
                order.getQuantity(),
                order.getTotalValue()
        );
    }
}