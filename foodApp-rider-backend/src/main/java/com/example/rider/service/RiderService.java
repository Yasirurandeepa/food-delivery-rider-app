package com.example.rider.service;

import com.example.rider.model.ApiResponse;
import com.example.rider.model.Rider;
import com.example.rider.model.RiderDto;

import java.util.List;

public interface RiderService {

    ApiResponse<Rider> save(RiderDto user);
    List<Rider> findAll();
    void delete(int id);

    Rider findOne(String username);

    Rider findById(int id);

    RiderDto update(RiderDto riderDto);
}
