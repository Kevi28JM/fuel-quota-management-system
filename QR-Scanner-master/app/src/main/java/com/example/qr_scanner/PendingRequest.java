package com.example.qr_scanner;

public class PendingRequest {
    private String name;
    private String nic;
    private String username;
    private String email;
    private String password;
    private String station;

    public PendingRequest(String name, String nic, String username, String email, String password, String station) {
        this.name = name;
        this.nic = nic;
        this.username = username;
        this.email = email;
        this.password = password;
        this.station = station;
    }
}
