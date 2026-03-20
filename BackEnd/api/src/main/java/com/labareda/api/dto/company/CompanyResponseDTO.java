package com.labareda.api.dto.company;

import com.labareda.api.domain.model.Company;

import javax.swing.text.html.parser.Entity;

public record CompanyResponseDTO(
        Long id,
        String name

) {
    public static CompanyResponseDTO fromEntity(Company company) {
        return new CompanyResponseDTO(company.getId(), company.getName());
    }
}
