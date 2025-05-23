package com.example.qr_scanner;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface ApiService {
    @POST("/stationOperator") // This is the endpoint from your Node.js API
    Call<ApiResponse> sendRegistration(@Body PendingRequest pendingRequest);


    @POST("/stationOperator/login")
    Call<LoginResponse> loginStationOperator(@Body LoginRequest loginRequest);
}
