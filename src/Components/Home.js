import React, {useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {NotificationContainer} from 'react-notifications';

import NavBar from './NavBar';
import Login from './Login';
import ToDo from './ToDo';
import Signup from './Signup';


function Home(){
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState(null);

    const handleAuthChange = (auth) => {
        setAuth(auth);
    }

    const handleUserChange = (user) => {
        setUser(user);
    }
   
    return(
        <div>
            <NavBar auth = {auth} handleAuthChange = {handleAuthChange}/>
            <BrowserRouter>
                <Routes>
                    <Route path = "/" element = {!auth ? <Login auth = {auth} handleAuthChange = {handleAuthChange} handleUserChange = {handleUserChange}/> : <ToDo user = {user} />}/>
                    <Route path = "/signup" element = {<Signup/>} />
                </Routes>
            </BrowserRouter>
            <NotificationContainer />
        </div>
    );
}
export default Home;