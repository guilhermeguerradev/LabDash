package com.labareda.api.domain.controller;

import com.labareda.api.domain.service.ReportService;
import com.labareda.api.dto.report.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;

    @PostMapping("/orders")
    public ResponseEntity<OrderReportDTO> createOrderReport(@RequestBody @Valid PeriodRequestDTO dto) {
        return ResponseEntity.ok(reportService.createOrderReport(dto));
    }

    @PostMapping("/sales")
    public ResponseEntity<CounterSaleReportDTO> createSaleReport(@RequestBody @Valid PeriodRequestDTO dto) {
        return ResponseEntity.ok(reportService.createSaleReport(dto));
    }

    @PostMapping("/financial")
    public ResponseEntity<FinancialReportDTO> createFinancialReport(@RequestBody @Valid PeriodRequestDTO dto) {
        return ResponseEntity.ok(reportService.createFinancialReport(dto));
    }

    @GetMapping("/orders/last-7")
    public ResponseEntity<Last7OrdersDTO> getLast7DaysOrders() {
        return ResponseEntity.ok(reportService.getLast7DaysOrders());
    }

    @GetMapping("/sales/last-7")
    public ResponseEntity<Last7SalesDTO> getLast7DaysCounterSales() {
        return ResponseEntity.ok(reportService.getLast7DaysCounterSales());
    }
}

