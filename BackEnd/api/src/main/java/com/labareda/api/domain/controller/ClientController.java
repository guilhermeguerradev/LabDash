package com.labareda.api.domain.controller;

import com.labareda.api.domain.model.Client;
import com.labareda.api.domain.service.ClientService;
import com.labareda.api.dto.client.ClientRequestDTO;
import com.labareda.api.dto.client.ClientResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clients")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @GetMapping
    public ResponseEntity<List<ClientResponseDTO>> findAll() {
        List<ClientResponseDTO> response = clientService.findAll().stream()
                .map(ClientResponseDTO::fromEntity).toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientResponseDTO> findById(@PathVariable Long id) {
        Client response = clientService.findByIdOrThrow(id);
        return ResponseEntity.ok(ClientResponseDTO.fromEntity(response));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ClientResponseDTO>> findByName(@RequestParam String name) {
        List<ClientResponseDTO> response = clientService.findByName(name)
                .stream().map(ClientResponseDTO::fromEntity).toList();
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ClientResponseDTO> create(@RequestBody @Valid ClientRequestDTO dto) {
        Client response = clientService.save(dto);
        return ResponseEntity.status(201).body(ClientResponseDTO.fromEntity(response));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientResponseDTO> update(@PathVariable Long id, @RequestBody @Valid ClientRequestDTO dto) {
        Client response = clientService.update(id, dto);
        return ResponseEntity.status(200).body(ClientResponseDTO.fromEntity(response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, @RequestParam(defaultValue = "false") boolean deleteOrders) {
        clientService.delete(id, deleteOrders);
        return ResponseEntity.noContent().build();
    }
}
