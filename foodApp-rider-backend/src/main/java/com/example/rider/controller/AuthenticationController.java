package com.example.rider.controller;

import com.example.rider.config.JwtTokenUtil;
import com.example.rider.model.ApiResponse;
import com.example.rider.model.AuthToken;
import com.example.rider.model.LoginRider;
import com.example.rider.model.Rider;
import com.example.rider.service.RiderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/token")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private RiderService riderService;

    @RequestMapping(value = "/generate-token", method = RequestMethod.POST)
    public ApiResponse<AuthToken> generateToken(@RequestBody LoginRider loginRider) throws AuthenticationException {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRider.getUsername(), loginRider.getPassword()));
        final Rider rider = riderService.findOne(loginRider.getUsername());
        final String token = jwtTokenUtil.generateToken(rider);
        return new ApiResponse<>(200, "success",new AuthToken(token, rider.getUsername(), rider.getId()));
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public ApiResponse<Void> logout() throws AuthenticationException {
        return new ApiResponse<>(200, "success",null);
    }

}
