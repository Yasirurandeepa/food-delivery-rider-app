package com.example.rider.dao;

import com.example.rider.model.Deliver;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliverDao extends CrudRepository<Deliver, Integer> {

    List<Deliver> findAllByRiderid(int riderid);
}
