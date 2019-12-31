import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import React from "react";
import CustomHeader from "./CustomHeader";
import CustomFooter from "./CustomFooter";
import Home from "./Home";
import WrappedLoginForm from "./Login";
import WrappedRegistrationForm from "./Register";
import SideMenu from "./SideMenu";
import NewHeader from "./NewHeader";
import NewFooter from "./NewFooter";
import Profile from "./Profile";
import Location from "./Location";
import Delivery from "./Delivery";
import PrivateRoute from "../privateRoute";

localStorage.setItem("isUserLoggedIn", false);

class AppRouter extends React.Component {

    render() {
        return (
            <Router>
                {/*<CustomHeader/>*/}
                {/*<NewHeader/>*/}
                <Route path="/login" exact component={WrappedLoginForm}/>
                <Route path="/register" exact component={WrappedRegistrationForm}/>
                <PrivateRoute path="/profile" component={Profile}/>
                <PrivateRoute path="/location" component={Location}/>
                <PrivateRoute path="/deliveries" component={Delivery}/>
                <Route path="/" exact render={() => {
                    return <Redirect to="/login"/>
                }}/>
                {/*<CustomFooter/>*/}
                {/*<NewFooter/>*/}
            </Router>
        )
    }
}

export default AppRouter;