package com.example.qr_scanner;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface FuelApi {
    @GET("api/fuel/quota/{vehicleId}")
    Call<FuelResponse> getFuelQuota(@Path("vehicleId") String vehicleId);

    @POST("api/fuel/update")
    Call<FuelUpdateResponse> updateFuelQuota(@Body FuelUpdateRequest fuelData);
}