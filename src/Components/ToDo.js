import React, {useEffect, useState} from "react";
import { Container, Row, Col, Button, ListGroup, ListGroupItem, Card } from 'react-bootstrap';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import {obj} from '../object';

var tasks = {
    init: [],
    doing: [],
    done: [],
    notdone: []
}
var listTasks = [];

function updateTasks(userId, taskId, type){
    axios.post(`${obj.baseURL}/users/${userId}/updateTask/${taskId}`, {taskStatus: type})
        .then(res => {
            console.log(res.data);
        })
}

function deleteTasks(userId, taskId){
    axios.post(`${obj.baseURL}/users/${userId}/deleteTask/${taskId}`)
        .then(res => {
            console.log(res.data);
        })
}

function ToDo(props){
    const [newTask, setNewTask] = useState('');
    const [init, setInit] = useState([]);
    const [doing, setDoing] = useState([]);
    const [done, setDone] = useState([]);
    const [notdone, setNotDone] = useState([]);

    const onDragOver = (event) => {
        console.log('prevented default');
        event.preventDefault();
    }
    
    const onDragStart = (ev, taskName) => {
        console.log('dragstart', taskName);
        ev.dataTransfer.setData("taskName", taskName);
    }
    
    function onDrop(event, type){
        console.log('drop executed');
        let taskName = event.dataTransfer.getData("taskName");
        var tasksT = {
            init: [],
            doing: [],
            done: [],
            notdone: []
        }

        if(type === 'delete'){
            for(let i = 0; i < listTasks.length; i++){
                if(listTasks[i].taskName === taskName){
                    var temp = listTasks.splice(i, 1);
                    console.log(temp);
                    deleteTasks(props.user.id, temp[0]._id);
                    break;
                }
            }

            for(let i = 0; i < listTasks.length; i++){{
                    tasksT[listTasks[i].taskStatus].push(
                        <div key = {listTasks[i].taskName} draggable className = "draggable" onDragStart={(e) => onDragStart(e, listTasks[i].taskName)}>
                                    {listTasks[i].taskName}
                        </div>
                    );
                }
            }
        }
        else{
            for(let i = 0; i < listTasks.length; i++){
                if(listTasks[i].taskName === taskName){
                    updateTasks(props.user.id, listTasks[i]._id, type);
                    listTasks[i].taskStatus = type;
                    tasksT[listTasks[i].taskStatus].push(
                        <div key = {listTasks[i].taskName} draggable className = "draggable" onDragStart={(e) => onDragStart(e, listTasks[i].taskName)}>
                                    {listTasks[i].taskName}
                        </div>
                    );
                }
                else{
                    tasksT[listTasks[i].taskStatus].push(
                        <div key = {listTasks[i].taskName} draggable className = "draggable" onDragStart={(e) => onDragStart(e, listTasks[i].taskName)}>
                                    {listTasks[i].taskName}
                        </div>
                    );
                }
            }
        }
        
        tasks.init = tasksT.init;
        tasks.doing = tasksT.doing;
        tasks.done = tasksT.done;
        tasks.notdone = tasksT.notdone;
        setInit(tasks.init)
        setDoing(tasks.doing)
        setDone(tasks.done);
        setNotDone(tasks.notdone);
    }

    function addTasks(userId, task){
        axios.post(`${obj.baseURL}/users/${userId}/addTask`, {taskName: task, taskStatus: 'init'})
            .then(res => {
                if(res.data.ok){
                    NotificationManager.success(res.data.msg, 'Success');
                    listTasks.push(res.data.task);
                    tasks.init.push(
                        <div key = {res.data.task.taskName} draggable className = "draggable" onDragStart={(e) => onDragStart(e, res.data.task.taskName)}>
                                {res.data.task.taskName}
                        </div>
                    )
                    tasks.init = [...tasks.init];
                    setInit(tasks.init);
                    console.log(init);
                }
                else{
                    NotificationManager.error(res.data.msg, 'Error');
                }
            })
    }

    useEffect(() => {
        if(props.user){
            axios.get(`${obj.baseURL}/users/allTasks/${props.user.id}`)
            .then(res => {
                listTasks = res.data.tasks;
                listTasks.forEach(task => {
                    tasks[task.taskStatus].push(
                        <div key = {task.taskName} draggable className = "draggable" onDragStart={(e) => onDragStart(e, task.taskName)}>
                            {task.taskName}
                        </div>
                    )
                })
                setInit(tasks.init);
                setDoing(tasks.doing);
                setDone(tasks.done);
                setNotDone(tasks.notdone);
            })
        }
    }, [props.user])

    return(
        <div>
            <Container>
                <br />
                <Row>
                    <Col md = {3} onDragOver = {(event) => onDragOver(event)} onDrop = {(e) => {onDrop(e, "init")}} >
                        Tasks<br />
                        {init}
                        <input type = "text" value = {newTask} placeholder = "Add new task" onChange = {e => setNewTask(e.target.value)} />
                        <Button variant="primary" onClick = {() => {addTasks(props.user.id, newTask); setNewTask('')}}>Add</Button>
                    </Col>
                    <Col md = {3} onDragOver = {(event) => onDragOver(event)} onDrop = {(e) => {onDrop(e, "doing")}} >
                        <span>Doing<br /></span>
                        {doing}
                    </Col>
                    <Col md = {3} onDragOver = {(event) => onDragOver(event)} onDrop = {(e) => {onDrop(e, "done")}} >
                        <span>Done<br /></span>
                        {done}
                    </Col>
                    <Col md = {3} onDragOver = {(event) => onDragOver(event)} onDrop = {(e) => {onDrop(e, "notdone")}} >
                        <span>Not Done<br /></span>
                        {notdone}
                    </Col>
                </Row>
                <Row>
                    <Col md = {3} onDragOver = {(event) => onDragOver(event)} onDrop = {(e) => {onDrop(e, "delete")}}>
                        <Button variant = "danger">Delete</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default ToDo;