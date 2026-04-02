package com.labareda.api.domain.controller;


import com.labareda.api.domain.model.User;
import com.labareda.api.domain.service.UserService;
import com.labareda.api.dto.user.UserRequestDTO;
import com.labareda.api.dto.user.UserResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> findAll() {
        List<UserResponseDTO> response = userService.findAll()
                .stream().map(UserResponseDTO::fromEntity).toList();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> update( @PathVariable Long id, @RequestBody @Valid UserRequestDTO dto) {
        User response = userService.update(id, dto);
        return ResponseEntity.ok(UserResponseDTO.fromEntity(response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
