import React from "react";
import axios from 'axios';
import {Modal} from 'antd';
import '../css/profile.css'
import WrappedEditDetailsForm from "./EditDetails";
import SideMenu from "./SideMenu";
import NewHeader from "./NewHeader";
import NewFooter from "./NewFooter";
import UserService from "../services/UserService";

class Profile extends React.Component{

    state = {username: null, id: null, email: null, phone: null, visible: false, confirmLoading: false, ModalText: 'Content of the modal'};

    componentDidMount(): void {

        console.log("componentDidMount");
        UserService.loadUserDetails().then(
            success => {
                console.log(success);
                this.setState({
                    id: success.data.result.id,
                    username: success.data.result.username,
                    email: success.data.result.email,
                    phone: success.data.result.phone
                })
            },
            error => console.log(error)
        )
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

    render() {
        return (
            <div>
                <NewHeader/>
                <SideMenu activeKey={"1"}/>
                <div className="card">
                    <img src="/images/user.png" alt="John" style={{width: "100%"}}/>
                    <h1>{this.state.username}</h1>
                    <p className="title">{this.state.email}</p>
                    <p>User ID: {this.state.id}</p>
                    <p>Mobile: {this.state.phone}</p>
                    <p>
                        <button className="edit-details-button" onClick={this.showModal}>Edit Details</button>
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
                        <WrappedEditDetailsForm/>
                    </Modal>
                </div>
                <NewFooter/>
            </div>

            );
        }
    }

    export default Profile;