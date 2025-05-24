package com.example.qr_scanner;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class login extends AppCompatActivity {

    private EditText etEmailLogin, etPasswordLogin;
    private Button btnLogin;
    private TextView tvGoToSignup;
    private ApiService apiService;

    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        // Initialize views
        etEmailLogin = findViewById(R.id.etEmailLogin);
        etPasswordLogin = findViewById(R.id.etPasswordLogin);
        btnLogin = findViewById(R.id.btnLogin);
        tvGoToSignup = findViewById(R.id.tvGoToSignup);

        // Initialize Retrofit service
        apiService = RetrofitClient.getRetrofitInstance().create(ApiService.class);

        // Set click listener for login button
        btnLogin.setOnClickListener(v -> attemptLogin());

        // Set click listener for signup text
        tvGoToSignup.setOnClickListener(v -> {
            Intent intent = new Intent(login.this, signUp.class);
            startActivity(intent);
        });
    }

    private void attemptLogin() {
        String email = etEmailLogin.getText().toString().trim();
        String password = etPasswordLogin.getText().toString().trim();

        if (email.isEmpty() || password.isEmpty()) {
            Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show();
            return;
        }

        LoginRequest loginRequest = new LoginRequest(email, password);

        Call<LoginResponse> call = apiService.loginStationOperator(loginRequest);
        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    LoginResponse loginResponse = response.body();
                    if (loginResponse.isSuccess()) {
                        // Login successful
                        Toast.makeText(login.this, "Login successful", Toast.LENGTH_SHORT).show();

                        // Debug logs
                        Log.d("LoginDebug", "Operator ID: " + loginResponse.getOperator().getId());
                        Log.d("LoginDebug", "Station ID: " + loginResponse.getOperator().getStationId());

                        Intent intent = new Intent(login.this, MainActivity.class);
                        intent.putExtra("operatorId", loginResponse.getOperator().getId());
                        intent.putExtra("stationId", loginResponse.getOperator().getStationId());
                        startActivity(intent);
                        finish();
                    } else {
                        // Login failed
                        Toast.makeText(login.this, loginResponse.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                } else {
                    Toast.makeText(login.this, "Login failed. Please try again.", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                Toast.makeText(login.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
}