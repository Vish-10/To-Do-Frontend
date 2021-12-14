import React, { useState } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import {obj} from '../object';

function Signup(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [color, setColor] = useState('');

    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    function handleSubmit(){
        if(!email.match(mailFormat)){
            NotificationManager.error('Check your E-Mail', 'Error');
            setColor('red')
        }
        else{
            axios.post(`${obj.baseURL}/users/signup`, {userName: userName, password: password, name: name, email: email})
            .then(res => {
                if(res.data.ok){
                    NotificationManager.success(res.data.msg, 'Success');
                    setColor('');
                    setUserName('');
                    setPassword('');
                    setEmail('');
                    setName('')
                }
                else    
                    NotificationManager.error(res.data.msg, 'Error');
            })
        }
    }

    return(
        <div>
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                    <br/><br/><br/>
                        <form>
                            <input type = "text" value = {name} placeholder = "Name" onChange = {e => setName(e.target.value)} />
                            <br/><br/>
                            <input type = "text" style = {{borderColor: color}} value = {email} placeholder = "E-Mail" onChange = {e => {setEmail(e.target.value);}}/>
                            <br/><br/>
                            <input type = "text" value = {userName} placeholder = "UserName" onChange = {e => setUserName(e.target.value)} />
                            <br/><br/>
                            <input type = "password" value = {password} placeholder = "Password" onChange = {e => setPassword(e.target.value)} />
                            <br /><br/>
                            <Button variant="primary" onClick = {handleSubmit}>Submit</Button>{' '}
                        </form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
  }

  export default Signup;