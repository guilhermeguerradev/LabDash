package com.labareda.api.domain.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "daily_counter_sales")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class DailyCounterSale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "sale_date")
    private LocalDate date;

    @NotNull @PositiveOrZero
    @Column(name = "pix_amount", precision = 10, scale = 2)
    private BigDecimal pixAmount;

    @NotNull @PositiveOrZero
    @Column(name = "cash_amount", precision = 10, scale = 2)
    private BigDecimal cashAmount;

    @NotNull @PositiveOrZero
    @Column(name = "card_amount", precision = 10, scale = 2)
    private BigDecimal cardAmount;

        @Setter(AccessLevel.NONE)
        @PositiveOrZero
        @Column(name = "total_day", precision = 10, scale = 2)
        private BigDecimal totalDay;

    @PrePersist
    @PreUpdate
    public void calcularTotal() {
        BigDecimal pix = pixAmount != null ? pixAmount : BigDecimal.ZERO;
        BigDecimal cash = cashAmount != null ? cashAmount : BigDecimal.ZERO;
        BigDecimal card = cardAmount != null ? cardAmount : BigDecimal.ZERO;
        this.totalDay = pix.add(cash).add(card);
    }
}
