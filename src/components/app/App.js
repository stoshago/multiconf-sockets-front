import React, {useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Layout} from "../layout";
import {LogInPage} from "../pages/loginPage";
import {SignUpPage} from "../pages/signupPage";
import {TodoListPage} from "../pages/todoListPage";
import PrivateRoute from "../privateRoute/PrivateRoute";
import {EventService} from "../../service/eventService";
import {AuthContext} from "../../context/authContext";
import AuthService from "../../service/authService";

const App = () => {

    const [auth, setAuth] = useState(AuthService.getCurrentUser);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            <EventService auth={auth}>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path="/"
                                   element={<Navigate to='/todos' replace/>}/>
                            <Route path="/login" element={<LogInPage/>}/>
                            <Route path="/signup" element={<SignUpPage/>}/>
                            <Route path="/todos"
                                   element={<PrivateRoute component={TodoListPage}/>}/>
                            <Route path="/todos/:listId"
                                   element={<PrivateRoute component={TodoListPage}/>}/>
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </EventService>
        </AuthContext.Provider>
    );
}

export default App;
