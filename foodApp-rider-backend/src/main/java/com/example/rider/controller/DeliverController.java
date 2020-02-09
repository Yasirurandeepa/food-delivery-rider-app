package com.example.rider.controller;

import com.example.rider.model.ApiResponse;
import com.example.rider.model.Deliver;
import com.example.rider.service.DeliverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/deliver")
public class DeliverController {

    @Autowired
    DeliverService deliverService;

    @GetMapping("/{id}")
    public ApiResponse<Deliver> getDeliverByRiderId(@PathVariable int id){
        return new ApiResponse<>(HttpStatus.OK.value(), "Delivers fetched successfully.", deliverService.loadDeliverByRiderId(id));
    }

    @GetMapping()
    public ApiResponse<List<Deliver>> listDeliver(){
        return new ApiResponse<>(HttpStatus.OK.value(), "Deliver list fetched successfully.", deliverService.findAll());
    }

    @PostMapping()
    public Deliver saveDeliver(@RequestBody Deliver deliver){
        return (deliverService.save(deliver));
    }

}
