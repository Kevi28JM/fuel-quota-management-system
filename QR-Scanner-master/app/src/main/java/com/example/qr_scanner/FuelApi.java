package com.example.qr_scanner;


import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface FuelApi {
    @GET("fuelQuota/{vehicleId}")
    Call<FuelResponse> getFuelQuota(@Path("vehicleId") String vehicleId);

    @POST("updateFuel")
    Call<Void> updateFuelQuota(@Body FuelData fuelData);
}
