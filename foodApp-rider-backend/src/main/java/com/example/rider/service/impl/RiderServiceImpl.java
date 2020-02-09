package com.example.rider.service.impl;

import com.example.rider.dao.RideDao;
import com.example.rider.model.ApiResponse;
import com.example.rider.model.Rider;
import com.example.rider.model.RiderDto;
import com.example.rider.service.RiderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@Service(value = "riderService")
public class RiderServiceImpl implements UserDetailsService, RiderService {

    @Autowired
    private RideDao rideDao;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Rider rider = rideDao.findByUsername(username);
        if(rider == null){
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(rider.getUsername(), rider.getPassword(), getAuthority());
    }

    private List<SimpleGrantedAuthority> getAuthority() {
        return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }

    public List<Rider> findAll() {
        List<Rider> list = new ArrayList<>();
        rideDao.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override
    public void delete(int id) {
        rideDao.deleteById(id);
    }

    @Override
    public Rider findOne(String username) {
        return rideDao.findByUsername(username);
    }

    @Override
    public Rider findById(int id) {
        Optional<Rider> optionalUser = rideDao.findById(id);
        return optionalUser.isPresent() ? optionalUser.get() : null;
    }

    @Override
    public RiderDto update(RiderDto riderDto) {
        Rider rider = findById(riderDto.getId());
        if(rider != null) {
//            BeanUtils.copyProperties(riderDto, rider, "password", "username");
//            rider.setId(id);
            rider.setEmail(riderDto.getEmail());
            rider.setPhone(riderDto.getPhone());
            rider.setStatus(riderDto.getStatus());
            rideDao.save(rider);
        }
        return riderDto;
    }

    @Override
    public ApiResponse<Rider> save(RiderDto rider) {
        Rider r = this.findOne(rider.getUsername());
        if(r == null){
            Rider newRider = new Rider();
            newRider.setUsername(rider.getUsername());
            newRider.setPassword(bcryptEncoder.encode(rider.getPassword()));
            newRider.setEmail(rider.getEmail());
            newRider.setPhone(rider.getPhone());
            newRider.setStatus(rider.getStatus());
            return new ApiResponse<Rider>(HttpStatus.OK.value(), "You are registered successfully.", rideDao.save(newRider));
        }else{
            return new ApiResponse<Rider>(HttpStatus.BAD_REQUEST.value(), "Username is already used", null);
        }
    }
}
