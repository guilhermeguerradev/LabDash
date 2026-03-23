package com.labareda.api.domain.service;

import com.labareda.api.domain.model.DailyCounterSale;
import com.labareda.api.domain.model.Order;
import com.labareda.api.dto.report.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final OrderService orderService;
    private final DailyCounterSaleService dailyCounterSaleService;

    // relatorio por periodo de orders
    public OrderReportDTO createOrderReport(PeriodRequestDTO dto) {
        List<Order> orders = orderService.findByPeriod(dto.startDate(), dto.endDate());
        int totalDays = (int) dto.startDate()
                .datesUntil(dto.endDate().plusDays(1))
                .count();

        int totalOrders = orders.size();
        BigDecimal totalValue = orders.stream().map(Order::getTotalValue).reduce(BigDecimal.ZERO, BigDecimal::add);

        return OrderReportDTO.fromEntity(dto.startDate(), dto.endDate(), totalDays, totalOrders, totalValue, orders);
    }

    //relatorio por periodo dos CounterSales
    public CounterSaleReportDTO createSaleReport(PeriodRequestDTO dto) {
        List<DailyCounterSale> sales = dailyCounterSaleService.findByPeriod(dto.startDate() , dto.endDate());
        int totalSales = sales.size();
        int totalDays = (int) dto.startDate()
                .datesUntil(dto.endDate().plusDays(1))
                .count();
        BigDecimal totalValue = sales.stream().map(DailyCounterSale::getTotalDay).reduce(BigDecimal.ZERO, BigDecimal::add);
        return CounterSaleReportDTO.fromEntity(dto.startDate(), dto.endDate(), totalDays,totalSales,totalValue,sales);
    }

    //relatorio por periodo dos orders e counterSales
    public FinancialReportDTO createFinancialReport(PeriodRequestDTO dto) {
        List<Order> orders = orderService.findByPeriod(dto.startDate(), dto.endDate());
        List<DailyCounterSale> sales = dailyCounterSaleService.findByPeriod(dto.startDate() , dto.endDate());

        int totalDays = (int) dto.startDate()
                .datesUntil(dto.endDate().plusDays(1))
                .count();

        BigDecimal totalOrders = orders.stream().map(Order::getTotalValue).reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalSales = sales.stream().map(DailyCounterSale::getTotalDay).reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalRevenue = totalSales.add(totalOrders);

        return FinancialReportDTO.fromEntity(dto.startDate(), dto.endDate(), totalDays,totalOrders,totalSales,totalRevenue);
    }

    public OrderReportDTO getLast7DaysOrders() {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(6);
        return createOrderReport(new PeriodRequestDTO(startDate, endDate));
    }

    public CounterSaleReportDTO getLast7DaysCounterSales() {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(6);
        return createSaleReport(new PeriodRequestDTO(startDate, endDate));
    }
}
