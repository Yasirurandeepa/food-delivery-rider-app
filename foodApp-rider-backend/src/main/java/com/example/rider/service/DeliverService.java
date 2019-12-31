package com.example.rider.service;

import com.example.rider.model.Deliver;

import java.util.List;

public interface DeliverService {

    List<Deliver> findAll();

    Deliver save(Deliver deliver);

    List<Deliver>loadDeliverByRiderId(int riderId);
}
