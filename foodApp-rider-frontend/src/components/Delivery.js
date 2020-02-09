import React from "react";
import axios from "axios";
import { Table } from 'antd';
import '../css/delivery.css'
import NewHeader from "./NewHeader";
import SideMenu from "./SideMenu";
import NewFooter from "./NewFooter";
import DeliveryService from "../services/DeliveryService";

const columns = [
    // {
    //     title: 'Deliver Id',
    //     dataIndex: 'id',
    //     key: 'deliver',
    // },
    // {
    //     title: 'Rider Id',
    //     dataIndex: 'riderId',
    //     key: 'rider',
    // },
    {
        title: 'Customer Id',
        dataIndex: 'customerId',
        key: 'customer',
    },
    {
        title: 'Resturant Id',
        dataIndex: 'resturantId',
        key: 'resturant',
    },
    {
        title: 'Food Id',
        dataIndex: 'foodId',
        key: 'food',
    },
    {
        title: 'Payment',
        dataIndex: 'payment',
        key: 'payment',
    }
];

class Delivery extends React.Component{

    state = {dataSource: []};

    componentDidMount(): void {
        DeliveryService.listDeliveriesByRiderId().then(
            success => {
                console.log(success.data.result);
                this.fetchDeliverRecords(success.data.result);
            },
            error => console.log(error)
        )
    }

    fetchDeliverRecords(deliveries){
        for(let j=0; j<deliveries.length; j++){
            delete deliveries[j].id;
            delete deliveries[j].riderid;
            deliveries[j]["key"] = j + 1;
        }
        console.log(deliveries);
        this.setState({dataSource: deliveries})
    }

    render() {
        return (
            <div>
                <NewHeader/>
                <SideMenu activeKey={"2"}/>
                <div>
                    <div className="deliveryTable">
                        <h1>Delivery Records</h1>
                        <Table dataSource={this.state.dataSource} columns={columns}  pagination={false}  />
                    </div>
                </div>
                <NewFooter/>
            </div>
        );
    }
}

export default Delivery;