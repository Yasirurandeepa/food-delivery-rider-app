package com.example.rider.model;

import javax.persistence.*;

@Entity
@Table(name = "deliver")
public class Deliver {

    public Deliver() {
    }

    public Deliver(int riderid, int customerId, int resturantId, int foodId, int payment){
        this.riderid = riderid;
        this.customerId = customerId;
        this.resturantId = resturantId;
        this.foodId = foodId;
        this.payment = payment;
    }

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column
    private int riderid;

    @Column
    private int customerId;

    @Column
    private int resturantId;

    @Column
    private int foodId;

    @Column
    private int payment;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRiderid() {
        return riderid;
    }

    public void setRiderid(int riderId) {
        this.riderid = riderId;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public int getResturantId() {
        return resturantId;
    }

    public void setResturantId(int resturantId) {
        this.resturantId = resturantId;
    }

    public int getFoodId() {
        return foodId;
    }

    public void setFoodId(int foodId) {
        this.foodId = foodId;
    }

    public int getPayment() {
        return payment;
    }

    public void setPayment(int payment) {
        this.payment = payment;
    }
}
