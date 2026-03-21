package com.labareda.api.domain.controller;

import com.labareda.api.domain.model.DailyCounterSale;
import com.labareda.api.domain.service.DailyCounterSaleService;
import com.labareda.api.dto.dailyCounterSale.DailyCounterSaleRequestDTO;
import com.labareda.api.dto.dailyCounterSale.DailyCounterSaleResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/counter-sales")
@RequiredArgsConstructor
public class DailyCounterSaleController {

    private final DailyCounterSaleService dailyCounterSaleService;

    @GetMapping
    public ResponseEntity<List<DailyCounterSaleResponseDTO>> findAll() {
        List<DailyCounterSaleResponseDTO> response = dailyCounterSaleService.findAll().stream().map(DailyCounterSaleResponseDTO::fromEntity).toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DailyCounterSaleResponseDTO> findById(@PathVariable Long id) {
        DailyCounterSale response = dailyCounterSaleService.findByIdOrThrow(id);
        return ResponseEntity.ok(DailyCounterSaleResponseDTO.fromEntity(response));
    }

    @GetMapping("/search")
    public ResponseEntity<DailyCounterSaleResponseDTO> findByDate(@RequestParam @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate date) {
            DailyCounterSale response = dailyCounterSaleService.findByDate(date);
            return ResponseEntity.ok(DailyCounterSaleResponseDTO.fromEntity(response));
    }

    @PostMapping
    public ResponseEntity<DailyCounterSaleResponseDTO> create(@RequestBody @Valid DailyCounterSaleRequestDTO dto) {
        DailyCounterSale response = dailyCounterSaleService.save(dto);
        return ResponseEntity.status(201).body(DailyCounterSaleResponseDTO.fromEntity(response));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DailyCounterSaleResponseDTO> update(@PathVariable Long id, @RequestBody @Valid DailyCounterSaleRequestDTO dto) {
        DailyCounterSale response = dailyCounterSaleService.update(id , dto);
        return ResponseEntity.ok(DailyCounterSaleResponseDTO.fromEntity(response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        dailyCounterSaleService.delete(id);
        return ResponseEntity.noContent().build();
    }




}
