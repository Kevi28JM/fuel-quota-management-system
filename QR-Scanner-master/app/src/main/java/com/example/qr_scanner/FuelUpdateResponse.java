package com.example.qr_scanner;

public class FuelUpdateResponse {
    private String message;
    private int transactionId;
    private int newQuota;

    public String getMessage() {
        return message;
    }

    public int getTransactionId() {
        return transactionId;
    }

    public int getNewQuota() {
        return newQuota;
    }
}