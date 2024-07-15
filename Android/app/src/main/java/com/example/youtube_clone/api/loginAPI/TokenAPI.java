package com.example.youtube_clone.api.loginAPI;

import com.example.youtube_clone.MyApplication;
import com.example.youtube_clone.R;
import com.example.youtube_clone.authorization.AuthInterceptor;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class TokenAPI {
    public interface LoginCallback {
        void onSuccess(LoginResponse result);

        void onError(String message);
    }

    Retrofit retrofit;
    RequestToken requestToken;

    public TokenAPI() {

        OkHttpClient client = new OkHttpClient.Builder()
                .addInterceptor(new AuthInterceptor())
                .build();

        this.retrofit = new Retrofit.Builder()
                .baseUrl(MyApplication.getAppContext().getString(R.string.BaseUrl))
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        this.requestToken = retrofit.create(RequestToken.class);

    }

    public void loginUser(String username, String password, LoginCallback callback) {
        LoginRequest loginRequest = new LoginRequest(username, password);

        Call<LoginResponse> call = requestToken.login(loginRequest);

        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                if (response.isSuccessful()) {
                    LoginResponse loginResponse = response.body();
                    if (loginResponse != null) {
                        callback.onSuccess(loginResponse);
                    } else {
                        callback.onError("Empty response received");
                    }
                } else if (response.code() == 404) {
                    callback.onError("Wrong username or password");
                } else {
                    callback.onError("Error: " + response.code() + " " + response.message());
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable throwable) {
                callback.onError("Network error: " + throwable.getMessage());
            }
        });
    }

}
