package com.labareda.api.domain.repository;

import com.labareda.api.domain.model.Client;
import com.labareda.api.domain.model.Company;
import com.labareda.api.domain.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByDate(LocalDate date);
    List<Order> findByDateBetween(LocalDate startDate, LocalDate endDate);
    List<Order> findByCompanyNameIgnoreCase(String companyName);
    List<Order> findByClientNameIgnoreCase(String clientName);
    void deleteAllByCompany(Company company);
    void deleteAllByClient(Client client);

    @Query("""
    SELECT o.date, SUM(o.quantity * c.unitPrice)
    FROM Order o
    JOIN o.client c
    WHERE o.date BETWEEN :start AND :end
    GROUP BY o.date
    ORDER BY o.date ASC
""")
    List<Object[]> findDailyTotals(
            @Param("start") LocalDate start,
            @Param("end") LocalDate end
    );
}
