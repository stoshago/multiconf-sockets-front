import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {IconButton} from "@mui/material";
import Box from "@mui/material/Box";
import AuthService from "../../service/authService";
import {useNavigate} from "react-router-dom";

export const Header = () => {

    const navigate = useNavigate();

    const handleLogOut = () => {
        AuthService.logout();
        navigate('/login');
    }

    const logOutBtn = () => {
        return (
            <Button
                color="inherit"
                onClick={handleLogOut}
            >Log Out</Button>
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
