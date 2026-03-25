package com.labareda.api.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;


import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn (name = "company_id")
    private Company company;

    @NotNull
    @ManyToOne
    @JoinColumn (name = "client_id")
    private Client client;

    @NotNull
    @Positive
    private int quantity;

    @NotNull
    private BigDecimal totalValue;

    @NotNull
    private LocalDate date;
}
