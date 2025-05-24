package com.example.qr_scanner;

public class FuelUpdateRequest {
    private int vehicleId;
    private int litres;
    private int stationId;
    private int operatorId;

    public FuelUpdateRequest(int vehicleId, int litres, int stationId, int operatorId) {
        this.vehicleId = vehicleId;
        this.litres = litres;
        this.stationId = stationId;
        this.operatorId = operatorId;
    }

    // Getters
    public int getVehicleId() {
        return vehicleId;
    }

    public int getLitres() {
        return litres;
    }

    public int getStationId() {
        return stationId;
    }

    public int getOperatorId() {
        return operatorId;
    }

    @Override
    public String toString() {
        return "FuelUpdateRequest{" +
                "vehicleId=" + vehicleId +
                ", litres=" + litres +
                ", stationId=" + stationId +
                ", operatorId=" + operatorId +
                '}';
    }
}