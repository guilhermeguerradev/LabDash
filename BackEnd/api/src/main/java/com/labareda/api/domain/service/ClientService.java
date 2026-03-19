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
        Client client = new Client();

        client.setName(dto.name());
        client.setUnitPrice(dto.unitPrice());

        if (clientRepository.findByNameIgnoreCase(dto.name()).isPresent()) {
            throw new RuntimeException("Cliente já cadastrado");
        }

        return clientRepository.save(client);
    }

    public Optional<Client> findById(Long id) {
        return clientRepository.findById(id);
    }

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

    public void delete(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        clientRepository.delete(client);
    }
}
