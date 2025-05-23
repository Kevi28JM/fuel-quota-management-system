package com.example.qr_scanner;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AutoCompleteTextView;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.button.MaterialButton;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class signUp extends AppCompatActivity {

    EditText et_name, et_nic, et_username, et_email, et_password, et_confirm_password;
    AutoCompleteTextView spinner_station;
    MaterialButton btn_signup;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);

        et_name = findViewById(R.id.et_name);
        et_nic = findViewById(R.id.et_nic);
        et_username = findViewById(R.id.et_username);
        et_email = findViewById(R.id.et_email);
        et_password = findViewById(R.id.et_password);
        et_confirm_password = findViewById(R.id.et_confirm_password);
        spinner_station = findViewById(R.id.spinner_stations);
        btn_signup = findViewById(R.id.btn_signup);

        btn_signup.setOnClickListener(v -> {
            String name = et_name.getText().toString();
            String nic = et_nic.getText().toString();
            String username = et_username.getText().toString();
            String email = et_email.getText().toString();
            String password = et_password.getText().toString();
            String confirmPassword = et_confirm_password.getText().toString();
            String station = spinner_station.getText().toString();

            // 1. NIC validation (old or new format)
            if (!nic.matches("^(\\d{9}[vVxX]|\\d{12})$")) {
                Toast.makeText(signUp.this, "Invalid Sri Lankan NIC number", Toast.LENGTH_SHORT).show();
                return;
            }

            // 2. Email validation
            if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                Toast.makeText(signUp.this, "Invalid email address", Toast.LENGTH_SHORT).show();
                return;
            }

            // 3. Password length validation
            if (password.length() < 8) {
                Toast.makeText(signUp.this, "Password must be at least 8 characters", Toast.LENGTH_SHORT).show();
                return;
            }

            // 4. Station ID numeric check
            if (!station.matches("\\d+")) {
                Toast.makeText(signUp.this, "Station ID must be a number", Toast.LENGTH_SHORT).show();
                return;
            }

            // Password match check
            if (!password.equals(confirmPassword)) {
                Toast.makeText(signUp.this, "Passwords do not match", Toast.LENGTH_SHORT).show();
                return;
            }

            PendingRequest request = new PendingRequest(name, nic, username, email, password, station);
            ApiService apiService = RetrofitClient.getRetrofitInstance().create(ApiService.class);
            Call<ApiResponse> call = apiService.sendRegistration(request);

            call.enqueue(new Callback<ApiResponse>() {
                @Override
                public void onResponse(Call<ApiResponse> call, Response<ApiResponse> response) {
                    if (response.isSuccessful() && response.body() != null) {
                        Toast.makeText(signUp.this, response.body().getMessage(), Toast.LENGTH_SHORT).show();

                        // Redirect to login page
                        Intent intent = new Intent(signUp.this, login.class);
                        startActivity(intent);
                        finish();
                    } else {
                        Toast.makeText(signUp.this, "Registration failed: " + response.code(), Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<ApiResponse> call, Throwable t) {
                    Toast.makeText(signUp.this, "Failed: " + t.getMessage(), Toast.LENGTH_LONG).show();
                }
            });
        });
    }
}
