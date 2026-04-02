package com.labareda.api.domain.service;

import com.labareda.api.domain.model.User;
import com.labareda.api.domain.repository.UserRepository;

import com.labareda.api.dto.user.UserRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findByIdOrThrow(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }


    public Void delete(Long id) {
        if(!userRepository.existsById(id)) {
            throw new RuntimeException("ID inválido");
        }
        userRepository.deleteById(id);
        return null;
    };


    public User update(Long id, UserRequestDTO dto) {
        User user = findByIdOrThrow(id);

        user.setName(dto.name());
        user.setEmail(dto.email());

        if (dto.password() != null && !dto.password().isBlank())
            user.setPassword(passwordEncoder.encode(dto.password()));

        user.setRole(dto.role());

        return userRepository.save(user);
    }

}
