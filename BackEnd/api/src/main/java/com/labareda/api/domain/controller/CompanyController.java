package com.labareda.api.domain.controller;


import com.labareda.api.domain.model.Company;
import com.labareda.api.domain.service.CompanyService;
import com.labareda.api.dto.company.CompanyRequestDTO;
import com.labareda.api.dto.company.CompanyResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping
    public ResponseEntity<CompanyResponseDTO> create(@RequestBody @Valid CompanyRequestDTO dto) {
        Company company = companyService.save(dto);
        return ResponseEntity.status(201).body(CompanyResponseDTO.fromEntity(company));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompanyResponseDTO> update(@PathVariable Long id, @RequestBody @Valid CompanyRequestDTO dto) {
        Company company = companyService.update(id, dto);
        return ResponseEntity.status(200).body(CompanyResponseDTO.fromEntity(company));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        companyService.delete(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<CompanyResponseDTO>> findAll() {
        List<CompanyResponseDTO> response = companyService.findAll()
                .stream().map(CompanyResponseDTO::fromEntity).toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<List<CompanyResponseDTO>> findByName(@RequestParam String name) {
        List<CompanyResponseDTO> response = companyService.findByName(name).stream()
                .map(CompanyResponseDTO::fromEntity).toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyResponseDTO> findById(@PathVariable Long id) {
        Company response = companyService.findByIdOrThrow(id);
        return ResponseEntity.ok(CompanyResponseDTO.fromEntity(response));
    }
}
