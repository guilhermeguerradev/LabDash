package com.labareda.api.domain.controller;


import com.labareda.api.domain.service.AuthService;
import com.labareda.api.dto.auth.AuthRequestDTO;
import com.labareda.api.dto.auth.AuthResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody @Valid AuthRequestDTO dto){
        return ResponseEntity.ok(authService.login(dto));
    }
}
