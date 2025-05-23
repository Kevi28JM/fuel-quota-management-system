package com.example.qr_scanner;

public class Station {
    private String id;
    private String name;

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // This is important for the AutoCompleteTextView display
    @Override
    public String toString() {
        return name ;
    }
}