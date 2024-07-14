package com.example.youtube_clone;

import android.app.AlertDialog;
import android.app.DatePickerDialog;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.util.Base64;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;

import com.example.youtube_clone.api.userAPI.UserAPI;
import com.example.youtube_clone.databinding.ActivitySignupBinding;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class SignupActivity extends AppCompatActivity {

    // One Button
    ActivityResultLauncher<String> mTakePhoto;
    Uri selectedImageUri = null;
    String selectedDate;


    private UserAPI userAPI;
    private ActivitySignupBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        this.userAPI = new UserAPI();
        binding = ActivitySignupBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy", Locale.getDefault());
        Date currentDate = new Date();
        selectedDate = dateFormat.format(currentDate);
        binding.editTextDate.setText(selectedDate);

        binding.editTextDate.setOnClickListener(v -> {
            Calendar calendar = Calendar.getInstance();
            int year = calendar.get(Calendar.YEAR);
            int month = calendar.get(Calendar.MONTH);
            int day = calendar.get(Calendar.DAY_OF_MONTH);

            DatePickerDialog dialog = new DatePickerDialog(SignupActivity.this, (view, selectedYear, selectedMonth, selectedDayOfMonth) -> {
                selectedDate = String.format(Locale.getDefault(), "%02d-%02d-%04d", selectedDayOfMonth, selectedMonth, selectedYear);
                binding.editTextDate.setText(selectedDate);
            }, year, month, day);

            dialog.getDatePicker().setMaxDate(currentDate.getTime());
            dialog.show();
        });

        binding.uploadImage.setOnClickListener(v -> mTakePhoto.launch("image/*"));
        mTakePhoto = registerForActivityResult(
                new ActivityResultContracts.GetContent(),
                result -> {
                    if (result != null) {
                        selectedImageUri = result;
                        binding.uploadImage.setImageURI(selectedImageUri);
                    }
                }
        );

        binding.submitBtn.setOnClickListener(v -> {
            String username = binding.editTextUsername.getText().toString();
            String firstName = binding.editTextFirstName.getText().toString();
            String middleName = binding.editTextMiddleName.getText().toString();
            String lastName = binding.editTextLastName.getText().toString();
            String password = binding.editTextPassword.getText().toString();
            String birthDate = selectedDate;
            String photo = null;
            boolean darkMode = false;   // TODO get current darkmode

            if (username.isEmpty() || firstName.isEmpty() || middleName.isEmpty()
                    || lastName.isEmpty() || password.isEmpty() || birthDate == null || birthDate.isEmpty()) {
                String message = "You need to fill all the fields, and the password should have at least 2 letters, 2 numbers and 8 characters!";
                new android.app.AlertDialog.Builder(this)
                        .setTitle("Login Error")
                        .setMessage(message)
                        .setPositiveButton("OK", (dialog, which) -> dialog.dismiss())
                        .show();
            } else {
                if (selectedImageUri != null) {
                    InputStream inputStream = null;
                    try {
                        inputStream = getContentResolver().openInputStream(selectedImageUri);
                        Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
                        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                        bitmap.compress(Bitmap.CompressFormat.JPEG, 50, byteArrayOutputStream);
                        byte[] byteArray = byteArrayOutputStream.toByteArray();
                        photo = Base64.encodeToString(byteArray, Base64.DEFAULT);
                    } catch (IOException e) {
                        e.printStackTrace();
                        Toast.makeText(this, "Failed to upload image, but the user has been created.", Toast.LENGTH_SHORT).show();
                    } finally {
                        try {
                            inputStream.close();
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    }
                }
                UserN newUser = new UserN(username, password, firstName, middleName, lastName, birthDate, photo, darkMode);
                handleSignUp(newUser);
            }
        });
    }

    private void handleSignUp(UserN newUser) {
        userAPI.signUp(newUser, new UserAPI.UserCallback() {
            @Override
            public void onSuccess(UserN user, String message) {
                Toast.makeText(SignupActivity.this, message, Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(SignupActivity.this, LoginActivity.class);
                startActivity(intent);
                finish();
            }

            @Override
            public void onError(String message) {
                new AlertDialog.Builder(SignupActivity.this)
                        .setTitle("Error signing up")
                        .setMessage(message)
                        .setPositiveButton("OK", (dialog, which) -> dialog.dismiss())
                        .show();
            }
        });
    }
}






