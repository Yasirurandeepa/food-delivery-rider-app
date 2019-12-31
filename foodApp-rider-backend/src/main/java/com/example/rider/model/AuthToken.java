package com.example.rider.model;

public class AuthToken {

    private String token;
    private String username;
    private int id;

    public AuthToken(){

    }

    public AuthToken(String token, String username, int id){
        this.token = token;
        this.username = username;
        this.id = id;
    }

    public AuthToken(String token){
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}

