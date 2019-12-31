import React from 'react'
import { Layout, Row, Col, Icon, Badge, Menu, Dropdown, Avatar, Popover } from 'antd'
import '../css/newheader.css'
import {Link} from "react-router-dom";

const { Header } = Layout;

class NewHeader extends React.Component {

    username: string;

    constructor () {
        super()
    }

    handleLogOut = () => {
        localStorage.clear();
    };

    componentDidMount(): void {
        this.username = localStorage.getItem("username");
    }

    render () {

        const menu = (
            <Menu>
                <Menu.Item>
                    <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/login" onClick={this.handleLogOut}>Log Out</Link>
                </Menu.Item>
            </Menu>
        );

        const content = (
            <div>
                <p>Last Delivery</p>
                <p>Active Delivery</p>
                <p>History</p>
            </div>
        );

        return (
            <Header style={{ background: '#fff', padding: 0, backgroundColor: "dodgerblue", color: "white" }}>
                <Row type="flex" justify="end" align="middle">
                    <a style={{paddingRight: "950px", fontSize: "25px", color: "white"}}>Asiri Foods</a>
                    <Col span={3}>
                        <Badge className="header-icon" count={5}>
                            {/*<Link to="/mailbox">*/}
                            <a>
                                <Icon type="mail" />
                            </a>
                            {/*</Link>*/}
                        </Badge>
                        <Popover content={content} title="Title" trigger="click">
                            <Badge className="header-icon" dot>
                                <a href="#">
                                    <Icon type="notification" />
                                </a>
                            </Badge>
                        </Popover>
                    </Col>
                    <Col span={3}>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                                <Avatar style={{ verticalAlign: 'middle'}}>{this.username}</Avatar><Icon type="down" />
                            </a>
                        </Dropdown>
                    </Col>
                </Row>
            </Header>
        )
    }
}

export default NewHeader;
