import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Layout} from "../layout";
import {LogInPage} from "../pages/loginPage";
import {SignUpPage} from "../pages/signupPage";
import {TodoListPage} from "../pages/todoListPage";
import PrivateRoute from "../privateRoute/PrivateRoute";

function App() {
    return (
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
    );
}

export default App;
