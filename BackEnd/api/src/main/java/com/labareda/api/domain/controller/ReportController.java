package com.labareda.api.domain.controller;

import com.labareda.api.domain.service.ReportService;
import com.labareda.api.dto.report.CounterSaleReportDTO;
import com.labareda.api.dto.report.FinancialReportDTO;
import com.labareda.api.dto.report.OrderReportDTO;
import com.labareda.api.dto.report.PeriodRequestDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
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
    public ResponseEntity<OrderReportDTO> getLast7DaysOrders() {
        return ResponseEntity.ok(reportService.getLast7DaysOrders());
    }

    @GetMapping("/sales/last-7")
    public ResponseEntity<CounterSaleReportDTO> getLast7DaysCounterSales() {
        return ResponseEntity.ok(reportService.getLast7DaysCounterSales());
    }
}

