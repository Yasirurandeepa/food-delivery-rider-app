import React from "react";
import axios from 'axios';
import {message, Modal} from 'antd';
import '../css/profile.css'
import WrappedEditDetailsForm from "./EditDetails";
import SideMenu from "./SideMenu";
import NewHeader from "./NewHeader";
import NewFooter from "./NewFooter";
import UserService from "../services/UserService";

class Profile extends React.Component{

    state = {username: null, id: null, email: null, phone: null, currentStatus: null, updateStatus: null,
        statusColor: null, updateStatusColor: null, visible: false, confirmLoading: false, ModalText: 'Content of the modal'};

    componentDidMount(): void {

        UserService.loadUserDetails().then(
            success => {
                console.log(success);
                this.setState({
                    id: success.data.result.id,
                    username: success.data.result.username,
                    email: success.data.result.email,
                    phone: success.data.result.phone,
                    status: success.data.result.status
                });
                if(success.data.result.status === "available"){
                    this.setState({statusColor: "green"});
                    this.setState({updateStatusColor: "red"});
                    this.setState({currentStatus: "available"});
                    this.setState({updateStatus: "Unavailable"});
                }else{
                    this.setState({statusColor: "red"});
                    this.setState({updateStatusColor: "green"});
                    this.setState({currentStatus: "Unavailable"});
                    this.setState({updateStatus: "available"});
                }
            },
            error => console.log(error)
        );
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    updateStatus = () => {
        axios({
            method: 'put',
            url: 'http://localhost:8080/rider/' + localStorage.getItem("uid"),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Authorization": localStorage.getItem("jwtToken")
            },
            data: {
                id: localStorage.getItem("uid"),
                email: this.state.email,
                phone: this.state.phone,
                status: this.state.updateStatus
            }
        }).then(
            success => {
                message.success("Your Status Updated Successfully");
                let tempState = this.state.currentStatus;
                let tempStateColor = this.state.statusColor;
                this.setState({currentStatus: this.state.updateStatus});
                this.setState({statusColor: this.state.updateStatusColor})
                this.setState({updateStatus: tempState});
                this.setState({updateStatusColor: tempStateColor});
            },
            error => console.log(error)
        );
    };

    render() {
        return (
            <div>
                <NewHeader/>
                <SideMenu activeKey={"1"}/>
                <div className="card">
                    <img src="/images/user.png" alt="John" style={{width: "100%"}}/>
                    <h1>{this.state.username}</h1>
                    <h3 style={{color: "black"}}>Current Status: <span style={{color: this.state.statusColor}}>{this.state.currentStatus}</span></h3>
                    <p className="title">{this.state.email}</p>
                    <p>User ID: {this.state.id}</p>
                    <p>Mobile: {this.state.phone}</p>
                    <p>
                        <button className="edit-details-button" onClick={this.showModal}>Edit Details</button>
                    </p>
                    <p>
                        <button className="update-status-button" style={{backgroundColor: this.state.updateStatusColor}} onClick={this.updateStatus}>Update Status as {this.state.updateStatus}</button>
                    </p>

                    <Modal
                        title="Edit Details"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        confirmLoading={this.state.confirmLoading}
                        onCancel={this.handleCancel}
                        cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}
                    >
                        <WrappedEditDetailsForm status={this.state.currentStatus}/>
                    </Modal>
                </div>
                <NewFooter/>
            </div>

            );
        }
    }

    export default Profile;