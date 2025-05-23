// LoginResponse.java
package com.example.qr_scanner;

public class LoginResponse {
    private boolean success;
    private String message;
    private StationOperator operator;

    // Getters
    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public StationOperator getOperator() {
        return operator;
    }
}
