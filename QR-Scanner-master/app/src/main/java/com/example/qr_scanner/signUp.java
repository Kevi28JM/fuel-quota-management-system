package com.example.qr_scanner;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.button.MaterialButton;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class signUp extends AppCompatActivity {

    EditText et_name, et_nic, et_username, et_email, et_password, et_confirm_password;
    AutoCompleteTextView spinner_station;
    MaterialButton btn_signup;
    List<Station> stationList = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);

        // Initialize views
        et_name = findViewById(R.id.et_name);
        et_nic = findViewById(R.id.et_nic);
        et_username = findViewById(R.id.et_username);
        et_email = findViewById(R.id.et_email);
        et_password = findViewById(R.id.et_password);
        et_confirm_password = findViewById(R.id.et_confirm_password);
        spinner_station = findViewById(R.id.spinner_stations);
        btn_signup = findViewById(R.id.btn_signup);

        // Load stations when activity starts
        loadStations();

        btn_signup.setOnClickListener(v -> validateAndRegister());
    }

    private void loadStations() {
        ApiService apiService = RetrofitClient.getRetrofitInstance().create(ApiService.class);
        Call<List<Station>> call = apiService.getStations();

        call.enqueue(new Callback<List<Station>>() {
            @Override
            public void onResponse(Call<List<Station>> call, Response<List<Station>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    stationList = response.body();
                    setupStationSpinner();
                } else {
                    Toast.makeText(signUp.this, "Failed to load stations", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Station>> call, Throwable t) {
                Toast.makeText(signUp.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void setupStationSpinner() {
        ArrayAdapter<Station> adapter = new ArrayAdapter<>(
                this,
                android.R.layout.simple_dropdown_item_1line,
                stationList
        );
        spinner_station.setAdapter(adapter);

        spinner_station.setOnClickListener(v -> spinner_station.showDropDown());

    }

    private void validateAndRegister() {
        String name = et_name.getText().toString();
        String nic = et_nic.getText().toString();
        String username = et_username.getText().toString();
        String email = et_email.getText().toString();
        String password = et_password.getText().toString();
        String confirmPassword = et_confirm_password.getText().toString();

        // Get selected station
        Station selectedStation = null;
        String selectedText = spinner_station.getText().toString();

        for (Station station : stationList) {
            if (selectedText.equals(station.toString())) {
                selectedStation = station;
                break;
            }
        }

        if (selectedStation == null) {
            Toast.makeText(this, "Please select a valid station", Toast.LENGTH_SHORT).show();
            return;
        }


        String stationId = selectedStation.getId();

        // Validation checks...
        if (!nic.matches("^(\\d{9}[vVxX]|\\d{12})$")) {
            Toast.makeText(this, "Invalid NIC number", Toast.LENGTH_SHORT).show();
            return;
        }

        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            Toast.makeText(this, "Invalid email", Toast.LENGTH_SHORT).show();
            return;
        }

        if (password.length() < 8) {
            Toast.makeText(this, "Password too short", Toast.LENGTH_SHORT).show();
            return;
        }

        if (!password.equals(confirmPassword)) {
            Toast.makeText(this, "Passwords don't match", Toast.LENGTH_SHORT).show();
            return;
        }

        PendingRequest request = new PendingRequest(name, nic, username, email, password, stationId);
        registerOperator(request);
    }

    private void registerOperator(PendingRequest request) {
        ApiService apiService = RetrofitClient.getRetrofitInstance().create(ApiService.class);
        Call<ApiResponse> call = apiService.sendRegistration(request);

        call.enqueue(new Callback<ApiResponse>() {
            @Override
            public void onResponse(Call<ApiResponse> call, Response<ApiResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    Toast.makeText(signUp.this, "Registration successful!", Toast.LENGTH_SHORT).show();
                    startActivity(new Intent(signUp.this, login.class));
                    finish();
                } else {
                    Toast.makeText(signUp.this, "Registration failed", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ApiResponse> call, Throwable t) {
                Toast.makeText(signUp.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
}