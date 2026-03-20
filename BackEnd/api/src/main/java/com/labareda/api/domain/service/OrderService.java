package com.labareda.api.domain.service;

import com.labareda.api.domain.model.Client;
import com.labareda.api.domain.model.Company;
import com.labareda.api.domain.model.Order;
import com.labareda.api.domain.repository.OrderRepository;
import com.labareda.api.dto.order.OrderRequestDTO;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ClientService clientService;
    private final CompanyService companyService;

    @Transactional
    public Order save(OrderRequestDTO dto) {

        Company company = companyService.findByIdOrThrow(dto.companyId());
        Client client = clientService.findByIdOrThrow(dto.clientId());

        Order order = new Order();

        order.setClient(client);
        order.setCompany(company);
        order.setDate(dto.date());
        order.setQuantity(dto.quantity());

        BigDecimal totalValue = client.getUnitPrice().multiply(BigDecimal.valueOf(dto.quantity()));
        order.setTotalValue(totalValue);

        return orderRepository.save(order);
    }

    public Order findByIdOrThrow(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public List<Order> findByDate(LocalDate date) {
        return orderRepository.findByDate(date);
    }

    public List<Order> findByCompanyName(String companyName) {
        return orderRepository.findByCompanyNameIgnoreCase(companyName);
    }

    public Map<LocalDate, List<Order>> findByPeriod(LocalDate startDate, LocalDate endDate) {
        return orderRepository.findByDateBetween(startDate, endDate).stream()
                .collect(Collectors.groupingBy(Order::getDate));
    }

    @Transactional
    public void delete(Long id) {
        if(!orderRepository.existsById(id)) {
            throw new RuntimeException("order not found!");
        }
        orderRepository.deleteById(id);
    }

}
