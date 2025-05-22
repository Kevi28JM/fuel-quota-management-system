package com.example.qr_scanner;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ApiService {
    private static Retrofit retrofit = null;

    public static StationOperatorService getStationOperatorService() {
        if (retrofit == null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl("http://10.0.2.2:5000/") // Emulator access to localhost
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit.create(StationOperatorService.class);
    }
}