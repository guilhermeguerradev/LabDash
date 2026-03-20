package com.labareda.api.domain.service;

import com.labareda.api.domain.model.Client;
import com.labareda.api.domain.repository.ClientRepository;
import com.labareda.api.dto.client.ClientRequestDTO;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;

    @Transactional
    public Client save(ClientRequestDTO dto) {
        clientRepository.findByNameIgnoreCase(dto.name())
                .ifPresent(c -> { throw new RuntimeException("Cliente já cadastrado"); });

        Client client = new Client();
        client.setName(dto.name());
        client.setUnitPrice(dto.unitPrice());
        return clientRepository.save(client);
    }

    public Client findById(Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
    }

    @Transactional
    public Client update(Long id, ClientRequestDTO dto) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        client.setName(dto.name());
        client.setUnitPrice(dto.unitPrice());

        return clientRepository.save(client);
    }

    public List<Client> findAll() {
        return clientRepository.findAll();
    }

    @Transactional
    public void delete(Long id) {
        if (!clientRepository.existsById(id)) {
            throw new RuntimeException("Cliente não encontrado");
        }
        clientRepository.deleteById(id);
    }
}
