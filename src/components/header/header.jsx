import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Toolbar from '@mui/material/Toolbar';
import AuthService from "../../service/authService";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/authContext";

export const Header = () => {

    const {setAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        AuthService.logout();
        setAuth(null);
        navigate('/login');
    }

    const logOutBtn = () => {
        return (
            <React.Fragment>
                <Typography><b>{AuthService.getCurrentUser().displayName}</b></Typography>
                <Button
                    color="inherit"
                    onClick={handleLogOut}
                >Log Out</Button>
            </React.Fragment>
        );
    };

    const logInBtn = () => {
        return (
            <Button
                color="inherit"
                onClick={() => navigate('/login')}
            >Log In</Button>
        );
    };

    const logInOutBtn = () => {
        return AuthService.getCurrentUser() ? logOutBtn() : logInBtn();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <img src="/images/trident.png" alt="trident" style={{maxHeight: '3rem'}}/>
                </IconButton>
                <Box sx={{flexGrow: 1}}/>
                {logInOutBtn()}
            </Toolbar>
        </AppBar>
    );
};
