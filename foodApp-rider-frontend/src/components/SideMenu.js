// import React from "react";
// import {Menu, Icon, Button} from 'antd';
// import '../css/sidemenu.css';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
// } from "react-router-dom";
// import Profile from "../components/Profile";
//
// class SideMenu extends React.Component {
//     state = {
//         collapsed: false,
//     };
//
//     toggleCollapsed = () => {
//         this.setState({
//             collapsed: !this.state.collapsed,
//         });
//     };
//
//     render() {
//         return (
//             <Router>
//                 <div style={{width: 200, backgroundColor: "white", position: "absolute"}}>
//                     <Button type="white" onClick={this.toggleCollapsed}
//                             style={{width: 200, marginTop: 16, marginLeft: 15, marginBottom: 10, textAlign: "left"}}>
//                         <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}/>
//                         <span> Side Menu</span>
//                     </Button>
//                     <Menu
//                         defaultSelectedKeys={['1']}
//                         mode="inline"
//                         style={{backgroundColor: "white", color: "black"}}
//                         inlineCollapsed={this.state.collapsed}
//                     >
//                         <Menu.Item key="1" className="menu-item">
//                             <Link to="/profile">
//                                 <Icon type="user"/>
//                                 <span>Profile</span>
//                             </Link>
//                         </Menu.Item>
//                         <Menu.Item key="2" className="menu-item">
//                             <Link to="/profile">
//                                 <Icon type="profile"/>
//                                 <span>Deliveries</span>
//                             </Link>
//                         </Menu.Item>
//                         <Menu.Item key="3" className="menu-item">
//                             <Icon type="profile"/>
//                             <span>Status</span>
//                         </Menu.Item>
//                         <Menu.Item key="4" className="menu-item">
//                             <Icon type="logout"/>
//                             <span>Logout</span>
//                         </Menu.Item>
//                     </Menu>
//                 </div>
//                 <Switch>
//                     <Route exact path="/profile">
//                         <Profile/>
//                     </Route>
//                 </Switch>
//             </Router>
//
//         );
//     }
// }
//
// export default SideMenu;


import React from "react";
import {Menu, Icon, Button, Layout} from 'antd';
import '../css/sidemenu.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Profile from "./Profile";
import WrappedEditDetailsForm from "./EditDetails";
import Delivery from "./Delivery";
import NewHeader from "./NewHeader";

const {Sider} = Layout;

class SideMenu extends React.Component {
    state = {
        collapsed: false,
        activeKey: this.props.activeKey,
        mode: 'inline'
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            mode: !this.state.collapsed ? 'vertical' : 'inline',
        });
    };

    menuClickHandle = (item) => {
        this.setState({
            activeKey: item.key
        })
    };

    render() {

        let {activeKey} = this.state;

        return (
            <div>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                    style={{position: "relative"}}
                >
                    <div className="ant-layout-logo"></div>
                    <Menu
                        mode={this.state.mode} theme="dark"
                        selectedKeys={[activeKey]}
                        // openKeys={[5]}
                        // defaultSelectedKeys={[activeKey]}
                        // defaultOpenKeys={[5]}
                        onClick={this.menuClickHandle}
                        style={{height: "80vh"}}
                    >

                        <Menu.Item key="1" className="menu-item">
                            <Link to="/profile">
                                <Icon type="user"/>
                                <span>Profile</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2" className="menu-item">
                            <Link to="/deliveries">
                                <Icon type="export"/>
                                <span>Deliveries</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3" className="menu-item">
                            <Link to={"/location"}>
                                <Icon type="search"/>
                                <span>Location</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4" className="menu-item">
                            <Link>
                                <Icon type="logout"/>
                                <span>Status</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                    <div className="sider-trigger">
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </div>
                </Sider>
                {/*<Switch>*/}
                {/*    <Route exact path="/profile">*/}
                {/*        <Profile/>*/}
                {/*    </Route>*/}
                {/*    <Route exact path="/deliveries">*/}
                {/*        <Delivery/>*/}
                {/*    </Route>*/}
                {/*    <Route>*/}

                {/*    </Route>*/}
                {/*</Switch>*/}
            </div>
        );
    }
}

export default SideMenu;

