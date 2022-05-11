import React from 'react'
import {Navigate} from "react-router-dom";
import AuthService from "../../service/authService";

const PrivateRoute = ({component: Component, ...rest}) => {
    return (AuthService.getCurrentUser() ? (
            <Component {...rest} />
        ) : (
            <Navigate to='/login' replace/>
        )
    )
}

export default PrivateRoute;
