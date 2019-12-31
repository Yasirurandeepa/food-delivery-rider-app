package com.example.rider.controller;

import com.example.rider.model.ApiResponse;
import com.example.rider.model.Rider;
import com.example.rider.model.RiderDto;
import com.example.rider.service.RiderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/rider")
public class RiderController {

    @Autowired
    private RiderService riderService;

    @PostMapping("/register")
    public ApiResponse<Rider> saveUser(@RequestBody RiderDto rider){
        return (riderService.save(rider));
    }

    @GetMapping
    public ApiResponse<List<Rider>> listUser(){
        return new ApiResponse<>(HttpStatus.OK.value(), "User list fetched successfully.", riderService.findAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<Rider> getOne(@PathVariable int id){
        return new ApiResponse<>(HttpStatus.OK.value(), "User fetched successfully.", riderService.findById(id));
    }

    @PutMapping("/{id}")
    public ApiResponse<RiderDto> update(@RequestBody RiderDto riderDto) {
        return new ApiResponse<>(HttpStatus.OK.value(), "User updated successfully.", riderService.update(riderDto));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable int id) {
        riderService.delete(id);
        return new ApiResponse<>(HttpStatus.OK.value(), "User deleted successfully.", null);
    }



}
