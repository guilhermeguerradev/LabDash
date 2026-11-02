package com.labareda.api.exception;

import java.time.LocalDateTime;

/**
 * Corpo padrão das respostas de erro da API.
 * O front-end lê o campo "message" para exibir o erro ao usuário.
 */
public record ErrorResponse(
        LocalDateTime timestamp,
        int status,
        String error,
        String message,
        String path
) {
}
