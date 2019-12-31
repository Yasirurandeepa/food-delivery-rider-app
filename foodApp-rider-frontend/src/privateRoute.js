import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthService from "./services/AuthService";

const PrivateRoute = ({ component: Component, ...rest }) => {

    // Add your own authentication on the below line.
    const isLoggedIn = AuthService.isLoggedIn();

    console.log(isLoggedIn);

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    )
};

export default PrivateRoute;