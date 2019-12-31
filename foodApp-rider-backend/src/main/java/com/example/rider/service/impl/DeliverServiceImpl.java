package com.example.rider.service.impl;

import com.example.rider.dao.DeliverDao;
import com.example.rider.model.Deliver;
import com.example.rider.service.DeliverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service(value = "deliverService")
public class DeliverServiceImpl implements DeliverService {

    @Autowired
    DeliverDao deliverDao;

    @Override
    public List<Deliver> loadDeliverByRiderId(int riderId) throws UsernameNotFoundException {
        List<Deliver> list = deliverDao.findAllByRiderid(riderId);
        if(list == null){
            throw new UsernameNotFoundException("Not yet have deliveries");
        }
        return (list);
    }

    @Override
    public List<Deliver> findAll() {
        List<Deliver> list = new ArrayList<>();
        deliverDao.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override
    public Deliver save(Deliver deliver) {
        return deliverDao.save(deliver);
    }
}
