package com.labareda.api.domain.service;

import com.labareda.api.domain.model.Client;
import com.labareda.api.domain.model.Company;
import com.labareda.api.domain.repository.CompanyRepository;
import com.labareda.api.domain.repository.OrderRepository;
import com.labareda.api.dto.company.CompanyRequestDTO;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;
    private final OrderRepository orderRepository;

    @Transactional
    public Company save(CompanyRequestDTO dto) {
        companyRepository.findByNameIgnoreCase(dto.name())
                .ifPresent(c -> { throw new RuntimeException("Empresa já cadastrada"); });

        Company company = new Company();
        company.setName(dto.name());

        return companyRepository.save(company);
    }

    public List<Company> findByName(String name) {
        return companyRepository.findByNameContainingIgnoreCase(name);
    }

    @Transactional
    public Company update(Long id, CompanyRequestDTO dto) {

        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));

        company.setName(dto.name());

        return companyRepository.save(company);
    }

    public List<Company> findAll() {
        return companyRepository.findAll();
    }

    public Company findByIdOrThrow(Long id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada"));
    }

    @Transactional
    public void delete(Long id, boolean deleteOrders) {
        Company company = findByIdOrThrow(id);
        if (deleteOrders) {
            orderRepository.deleteAllByCompany(company);
        }
        companyRepository.deleteById(id);
    }
}
