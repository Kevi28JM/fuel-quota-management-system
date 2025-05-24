package com.example.qr_scanner;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.card.MaterialCardView;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {

    private TextView textVehicleId, textFuelQuota;
    private EditText editPumpedLitres;
    private Button btnScanQR, btnSubmit;
    private MaterialCardView cardVehicleInfo;
    private String scannedVehicleId = "";
    private int vehicleDbId = -1;
    private String operatorId = null;
    private String stationId = null;
    private FuelApi fuelApi;
    private static final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize views
        textVehicleId = findViewById(R.id.textVehicleId);
        textFuelQuota = findViewById(R.id.textFuelQuota);
        editPumpedLitres = findViewById(R.id.editPumpedLitres);
        btnScanQR = findViewById(R.id.btnScanQR);
        btnSubmit = findViewById(R.id.btnSubmit);
        cardVehicleInfo = findViewById(R.id.cardVehicleInfo);

        // Get operator and station information from login intent
        Intent intent = getIntent();
        if (intent != null) {
            operatorId = intent.getStringExtra("operatorId");
            stationId = intent.getStringExtra("stationId");
            Log.d(TAG, "Operator ID: " + operatorId + ", Station ID: " + stationId);
        }

        // Initialize Retrofit
        fuelApi = RetrofitClient.getRetrofitInstance().create(FuelApi.class);

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
                Log.d(TAG, "Scanned QR Code: " + scannedVehicleId);
                fetchFuelQuota(scannedVehicleId);
            } else {
                Toast.makeText(this, "Scanning cancelled", Toast.LENGTH_LONG).show();
            }
        }
    }

    private void fetchFuelQuota(String vehicleId) {
        Call<FuelResponse> call = fuelApi.getFuelQuota(vehicleId);
        call.enqueue(new Callback<FuelResponse>() {
            @Override
            public void onResponse(Call<FuelResponse> call, Response<FuelResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    FuelResponse fuelResponse = response.body();
                    vehicleDbId = fuelResponse.getId();
                    textVehicleId.setText("Vehicle: " + fuelResponse.getVehicleNumber());
                    textFuelQuota.setText("Available Quota: " + fuelResponse.getQuota() + "L");
                    cardVehicleInfo.setVisibility(View.VISIBLE);

                    Log.d(TAG, "Quota fetched successfully. Vehicle DB ID: " + vehicleDbId);
                } else {
                    try {
                        String errorMsg = response.errorBody() != null ?
                                response.errorBody().string() : "Unknown error";
                        Log.e(TAG, "Error fetching quota: " + errorMsg);
                        Toast.makeText(MainActivity.this,
                                "Failed to fetch quota: " + errorMsg,
                                Toast.LENGTH_SHORT).show();
                    } catch (Exception e) {
                        Log.e(TAG, "Error parsing error body", e);
                    }
                }
            }

            @Override
            public void onFailure(Call<FuelResponse> call, Throwable t) {
                Log.e(TAG, "Network error fetching quota", t);
                Toast.makeText(MainActivity.this,
                        "Network error: " + t.getMessage(),
                        Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void submitFuelData() {

        Log.d(TAG, "submitFuelData called with vehicleDbId=" + vehicleDbId +
                ", operatorId=" + operatorId + ", stationId=" + stationId);


        if (vehicleDbId == -1) {
            Toast.makeText(this, "Scan a valid vehicle QR first", Toast.LENGTH_SHORT).show();
            return;
        }

        if (operatorId == null || stationId == null) {
            Toast.makeText(this, "Operator or station information missing", Toast.LENGTH_SHORT).show();
            return;
        }

        String litresStr = editPumpedLitres.getText().toString().trim();
        if (litresStr.isEmpty()) {
            Toast.makeText(this, "Enter pumped litres", Toast.LENGTH_SHORT).show();
            return;
        }

        try {
            int litres = Integer.parseInt(litresStr);
            if (litres <= 0) {
                Toast.makeText(this, "Please enter a valid amount", Toast.LENGTH_SHORT).show();
                return;
            }

            // Convert String IDs to integers for the request
            int opId = Integer.parseInt(operatorId);
            int stId = Integer.parseInt(stationId);

            FuelUpdateRequest fuelData = new FuelUpdateRequest(
                    vehicleDbId, litres, stId, opId);

            Log.d(TAG, "Submitting fuel data: " + fuelData);

            Call<FuelUpdateResponse> call = fuelApi.updateFuelQuota(fuelData);
            call.enqueue(new Callback<FuelUpdateResponse>() {
                @Override
                public void onResponse(Call<FuelUpdateResponse> call, Response<FuelUpdateResponse> response) {
                    if (response.isSuccessful() && response.body() != null) {
                        FuelUpdateResponse updateResponse = response.body();
                        textFuelQuota.setText("Available Quota: " + updateResponse.getNewQuota() + "L");
                        Toast.makeText(MainActivity.this,
                                "Fuel data submitted! SMS notification sent to vehicle owner.",
                                Toast.LENGTH_SHORT).show();

                        // Reset the input field
                        editPumpedLitres.setText("");
                    } else {
                        try {
                            String errorMsg = response.errorBody() != null ?
                                    response.errorBody().string() : "Unknown error";
                            Log.e(TAG, "Error updating quota: " + errorMsg);
                            Toast.makeText(MainActivity.this,
                                    "Submission failed: " + errorMsg,
                                    Toast.LENGTH_SHORT).show();
                        } catch (Exception e) {
                            Log.e(TAG, "Error parsing error body", e);
                        }
                    }
                }

                @Override
                public void onFailure(Call<FuelUpdateResponse> call, Throwable t) {
                    Log.e(TAG, "Network error updating quota", t);
                    Toast.makeText(MainActivity.this,
                            "Network error: " + t.getMessage(),
                            Toast.LENGTH_SHORT).show();
                }
            });
        } catch (NumberFormatException e) {
            Log.e(TAG, "Error parsing numbers", e);
            Toast.makeText(this, "Invalid number format", Toast.LENGTH_SHORT).show();
        }
    }
}