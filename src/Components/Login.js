import React, { useState } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import {Link} from "react-router-dom";
import {obj} from '../object';

function Login(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(){
        axios.post(`${obj.baseURL}/users/login`, {userName: userName, password: password})
            .then(res => {
                var auth = res.data.auth;
                var msg = res.data.msg;
                props.handleAuthChange(auth);
                props.handleUserChange(res.data.user);
                if(auth)
                    NotificationManager.success(msg, 'Success');
                else    
                    NotificationManager.error(msg, 'Error');
            })
    }

    return(
        <div>
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                    <br/><br/><br/>
                        <form>
                            <input type = "text" value = {userName} placeholder = "UserName" onChange = {e => setUserName(e.target.value)} />
                            <br/><br/>
                            <input type = "password" value = {password} placeholder = "Password" onChange = {e => setPassword(e.target.value)} />
                            <br /><br/>
                            <Button variant="primary" onClick = {handleSubmit}>Log-in</Button>{' '}
                            <Link to = "/signup" target = "_blank">Sign-up</Link>
                        </form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
  }

  export default Login;