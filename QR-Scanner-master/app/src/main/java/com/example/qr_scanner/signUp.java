package com.example.qr_scanner;

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

            if (!password.equals(confirmPassword)) {
                Toast.makeText(signUp.this, "Passwords do not match", Toast.LENGTH_SHORT).show();
                return;
            }

            PendingRequest request = new PendingRequest(name, nic, username, email, password, station);
            ApiService apiService = RetrofitClient.getRetrofitInstance().create(ApiService.class);
            Call<Void> call = apiService.sendRegistration(request);

            call.enqueue(new Callback<Void>() {
                @Override
                public void onResponse(Call<Void> call, Response<Void> response) {
                    if (response.isSuccessful()) {
                        Toast.makeText(signUp.this, "Registration successful!", Toast.LENGTH_SHORT).show();
                    } else {
                        Toast.makeText(signUp.this, "Server error!", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<Void> call, Throwable t) {
                    Toast.makeText(signUp.this, "Failed: " + t.getMessage(), Toast.LENGTH_LONG).show();
                }
            });
        });
    }
}
