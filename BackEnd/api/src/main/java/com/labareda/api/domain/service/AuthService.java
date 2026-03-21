package com.labareda.api.domain.service;


import com.labareda.api.domain.model.User;
import com.labareda.api.domain.repository.UserRepository;
import com.labareda.api.dto.auth.AuthRequestDTO;
import com.labareda.api.dto.auth.AuthResponseDTO;
import com.labareda.api.security.TokenService;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.Token;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UserRepository userRepository;

    public AuthResponseDTO login(AuthRequestDTO dto) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(dto.email(), dto.password());

        Authentication authentication = authenticationManager.authenticate(authToken);
        User user = (User) authentication.getPrincipal();
        String token = tokenService.generateToken(user);
        return new AuthResponseDTO(token, user.getName(), user.getRole().name());
    }

}
