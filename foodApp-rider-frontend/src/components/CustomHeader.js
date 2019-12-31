import React from "react";
import {Menu} from 'antd';
import {
    Link
} from "react-router-dom";
import '../css/header.css';

class CustomHeader extends React.Component {
    state = {
        current: '1',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
                theme="dark"
                style={{paddingLeft: "80vw", backgroundColor: "green"}}
            >
                <Menu.Item key="1">
                    {/*<Icon type="login"/>*/}
                    <Link to="/"><b className="navbarLogin">Home</b></Link>
                </Menu.Item>
                <Menu.Item key="2">
                    {/*<Icon type="login"/>*/}
                    <Link to="/login"><b className="navbarLogin">Login</b></Link>
                </Menu.Item>
                <Menu.Item key="3">
                    {/*<Icon type="user"/>*/}
                    <Link to="/register"><b className="navbarRegister">Register</b></Link>
                </Menu.Item>
            </Menu>
        );
    }
}

export default CustomHeader;
