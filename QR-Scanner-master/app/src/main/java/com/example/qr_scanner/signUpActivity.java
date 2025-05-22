package com.example.qr_scanner;

import android.os.Bundle;
import android.view.View;
import android.widget.AutoCompleteTextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class signUpActivity extends AppCompatActivity {

    TextInputEditText editName, editNIC, editEmail, editPassword, editConfirmPassword;
    AutoCompleteTextView spinnerStations;
    MaterialButton btnSignup;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.sign_up);

        // Bind views
        editName = findViewById(R.id.edit_name);
        editNIC = findViewById(R.id.edit_nic);
        editEmail = findViewById(R.id.et_email);
        editPassword = findViewById(R.id.edit_password);
        editConfirmPassword = findViewById(R.id.edt_confirm_password);
        spinnerStations = findViewById(R.id.spinner_stations);
        btnSignup = findViewById(R.id.btn_signup);

        btnSignup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sendSignupRequest();
            }
        });
    }

    private void sendSignupRequest() {
        String name = editName.getText().toString().trim();
        String nic = editNIC.getText().toString().trim();
        String email = editEmail.getText().toString().trim();
        String password = editPassword.getText().toString().trim();
        String confirmPassword = editConfirmPassword.getText().toString().trim();
        String station = spinnerStations.getText().toString().trim();

        // Basic validation
        if (name.isEmpty() || nic.isEmpty() || email.isEmpty() || password.isEmpty() || station.isEmpty()) {
            Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show();
            return;
        }

        if (!password.equals(confirmPassword)) {
            Toast.makeText(this, "Passwords do not match", Toast.LENGTH_SHORT).show();
            return;
        }

        // Create object
        StationOperator operator = new StationOperator(name, nic, email, password, station);

        // Send to backend
        StationOperatorService service = ApiService.getStationOperatorService();
        Call<Void> call = service.registerOperator(operator);

        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(signUpActivity.this, "Registered Successfully!", Toast.LENGTH_SHORT).show();
                    finish(); // Close activity or redirect
                } else {
                    Toast.makeText(signUpActivity.this, "Registration Failed: " + response.code(), Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Toast.makeText(signUpActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }
}
