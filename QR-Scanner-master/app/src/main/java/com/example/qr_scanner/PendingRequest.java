package com.example.qr_scanner;

public class PendingRequest {
    private String name;
    private String nic;
    private String email;
    private String password;
    private String station;

    public PendingRequest(String name, String nic, String email, String password, String station) {
        this.name = name;
        this.nic = nic;
        this.email = email;
        this.password = password;
        this.station = station;
    }
}
