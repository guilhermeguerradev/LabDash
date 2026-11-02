package com.labareda.api.exception;

/**
 * Lançada quando o registro já existe (cadastro duplicado). Vira HTTP 409.
 */
public class ConflictException extends RuntimeException {

    public ConflictException(String message) {
        super(message);
    }
}
