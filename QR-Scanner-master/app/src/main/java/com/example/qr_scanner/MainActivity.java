package com.example.qr_scanner;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    private TextView textVehicleId, textFuelQuota;
    private EditText editPumpedLitres;
    private Button btnScanQR, btnSubmit;
    private String scannedVehicleId = "";

    private Retrofit retrofit;
    private FuelApi fuelApi;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        textVehicleId = findViewById(R.id.textVehicleId);
        textFuelQuota = findViewById(R.id.textFuelQuota);
        editPumpedLitres = findViewById(R.id.editPumpedLitres);
        btnScanQR = findViewById(R.id.btnScanQR);
        btnSubmit = findViewById(R.id.btnSubmit);

        // Initialize Retrofit
        retrofit = new Retrofit.Builder()
                .baseUrl("http://your-backend-url.com/api/")  // Change this to your backend URL
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        fuelApi = retrofit.create(FuelApi.class);

        btnScanQR.setOnClickListener(v -> scanQRCode());

        btnSubmit.setOnClickListener(v -> submitFuelData());
    }

    private void scanQRCode() {
        IntentIntegrator integrator = new IntentIntegrator(this);
        integrator.setPrompt("Scan Vehicle QR Code");
        integrator.setBeepEnabled(true);
        integrator.setOrientationLocked(false);
        integrator.initiateScan();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
        if (result != null) {
            if (result.getContents() != null) {
                scannedVehicleId = result.getContents();
                textVehicleId.setText("Vehicle ID: " + scannedVehicleId);
                fetchFuelQuota(scannedVehicleId);
            } else {
                Toast.makeText(this, "Cancelled", Toast.LENGTH_LONG).show();
            }
        }
    }

    private void fetchFuelQuota(String vehicleId) {
        Call<FuelResponse> call = fuelApi.getFuelQuota(vehicleId);
        call.enqueue(new Callback<FuelResponse>() {
            @Override
            public void onResponse(Call<FuelResponse> call, Response<FuelResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    textFuelQuota.setText("Available Quota: " + response.body().getQuota() + "L");
                } else {
                    Toast.makeText(MainActivity.this, "Failed to fetch quota", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<FuelResponse> call, Throwable t) {
                Toast.makeText(MainActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void submitFuelData() {
        if (scannedVehicleId.isEmpty()) {
            Toast.makeText(this, "Scan a vehicle first", Toast.LENGTH_SHORT).show();
            return;
        }

        String litres = editPumpedLitres.getText().toString().trim();
        if (litres.isEmpty()) {
            Toast.makeText(this, "Enter pumped litres", Toast.LENGTH_SHORT).show();
            return;
        }

        FuelData fuelData = new FuelData(scannedVehicleId, Integer.parseInt(litres));
        Call<Void> call = fuelApi.updateFuelQuota(fuelData);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(MainActivity.this, "Fuel data submitted!", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(MainActivity.this, "Submission failed!", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Toast.makeText(MainActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
}
