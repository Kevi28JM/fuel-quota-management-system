package com.example.qr_scanner;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface StationOperatorService {
    @POST("/api/station/register") // Change path as needed
    Call<Void> registerOperator(@Body StationOperator operator);
}
