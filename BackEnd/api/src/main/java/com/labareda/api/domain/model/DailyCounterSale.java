package com.labareda.api.domain.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "daily_counter_sales")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DailyCounterSale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "sale_date")
    private LocalDate date;

    @NotNull @Positive
    @Column(name = "pix_amount", precision = 10, scale = 2)
    private BigDecimal pixAmount;

    @NotNull @Positive
    @Column(name = "cash_amount", precision = 10, scale = 2)
    private BigDecimal cashAmount;

    @NotNull @Positive
    @Column(name = "card_amount", precision = 10, scale = 2)
    private BigDecimal cardAmount;

    @NotNull
    @Column(name = "total_day", precision = 10, scale = 2)
    private BigDecimal totalDay;

    @PrePersist
    @PreUpdate
    public void calcularTotal() {
        this.totalDay = pixAmount.add(cashAmount).add(cardAmount);
    }
}
