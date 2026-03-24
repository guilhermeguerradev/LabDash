package com.labareda.api.domain.controller;

import com.labareda.api.domain.model.Order;
import com.labareda.api.domain.service.OrderService;
import com.labareda.api.dto.order.OrderRequestDTO;
import com.labareda.api.dto.order.OrderResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDTO> findById(@PathVariable Long id) {
        Order response = orderService.findByIdOrThrow(id);
        return ResponseEntity.ok(OrderResponseDTO.fromEntity(response));
    }

    @PostMapping
    public ResponseEntity<OrderResponseDTO> create(@RequestBody @Valid OrderRequestDTO dto) {
        Order response = orderService.save(dto);
        return ResponseEntity.status(201).body(OrderResponseDTO.fromEntity(response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        orderService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> findAll() {
        List<OrderResponseDTO> response = orderService.findAll()
                .stream()
                .map(OrderResponseDTO::fromEntity).toList();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderResponseDTO> update(@PathVariable Long id, @RequestBody @Valid OrderRequestDTO dto) {
        Order response = orderService.update(id,dto);
        return ResponseEntity.ok(OrderResponseDTO.fromEntity(response));
    }

    @GetMapping("/search")
    public ResponseEntity<List<OrderResponseDTO>> search(
            @RequestParam(required = false) @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate date,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate endDate) {

        List<Order> orders;

        if (startDate!= null && endDate != null) {
            orders = orderService.findByPeriod(startDate , endDate);
        } else if (date != null) {
            orders = orderService.findByDate(date);
        } else if (company != null) {
            orders = orderService.findByCompanyName(company);
        }  else {
            orders = orderService.findAll();
        }

        List<OrderResponseDTO> response = orders.stream().map(OrderResponseDTO::fromEntity).toList();
        return ResponseEntity.ok(response);
    }
}
