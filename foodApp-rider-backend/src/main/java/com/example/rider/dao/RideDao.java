package com.example.rider.dao;

import com.example.rider.model.Rider;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RideDao extends CrudRepository<Rider, Integer> {

    Rider findByUsername(String username);
}
