package com.labareda.api.exception;

/**
 * Lançada quando um registro buscado não existe. Vira HTTP 404.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
