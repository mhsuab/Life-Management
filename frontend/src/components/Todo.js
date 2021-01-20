import React, { useState, useEffect, useRef } from "react";
import { DndProvider } from "react-dnd";
import HTML5backend from "react-dnd-html5-backend";
import Column from "./TodoComponents/Column";
import CustomDragLayer from "./TodoComponents/CustomDragLayer";
import { Modal, Header, Form, Input, TextArea, Button, Select, Icon } from 'semantic-ui-react'
import { TwitterPicker, CirclePicker } from 'react-color';
import './Todo.scss';

import { GET_TODOS, ADD_TODO, DELETE_TODO, UPDATE_TODO,} from '../graphql';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';
import { testTodos } from './../config';

const Todo = () => {
    // const [myTasks, moveMyTask] = useState(tasks);
    const data = { 'getTodo': testTodos }
    const loading = true;

    // const { user } = useContext(AuthContext)
    // const {  refetch } = useQuery(GET_TODOS)
    // const [ updateTodo ] = useMutation(UPDATE_TODO)
    // const [ deleteTodo ] = useMutation(DELETE_TODO)
    // const [ addTodo ] = useMutation(ADD_TODO)

    const [_columnIndex, setColumnIndex] = useState()
    const [_index, setIndex] = useState()
    const [_id, setId] = useState()
    const [_name, setName] = useState()
    const firstUpdate = useRef(true);

    const [modalOpen, setModalOpen] = useState(false)
    const [choosedate, setChoosedate] = useState(new Date())
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [Count, setCount] = useState(0)
    const [color, setColor] = useState()
    const [title, setTitle] = useState('Event Title')
    const [input, setInput] = useState()
    const options = [
        { key: 'm', text: 'Male', value: 'male' },
        { key: 'f', text: 'Female', value: 'female' },
        { key: 'o', text: 'Other', value: 'other' },
    ]

    const parseQueryData = (todos) => {
        return [
            {
                title: 'Todo',
                tasks: todos.filter(todo => {
                    if (todo.category === 'Todo') return true;
                    else return false;
                })
            },
            {
                title: 'Doing',
                tasks: todos.filter(todo => {
                    if (todo.category === 'Doing') return true;
                    else return false;
                })
            },
            {
                title: 'Completed',
                tasks: todos.filter(todo => {
                    if (todo.category === 'Completed') return true;
                    else return false;
                })
            }
        ];
    }
    const t = parseQueryData(data.getTodo);

    const [myTasks, moveMyTask] = useState(t);

    const handleMoveMyTask = (from, to) => {
        // TODO: comunicate with backend `updateTodo`, if update successfully then run
        // TODO: else CRASH(server error?)
        const { task, columnIndex: fromColumnIndex, index } = from;
        console.log({'columnidx': fromColumnIndex})
        const { columnIndex: toColumnIndex } = to;

        const newMyTasks = [...myTasks];
        // remove task
        newMyTasks[fromColumnIndex].tasks.splice(index, 1);
        // move task
        newMyTasks[toColumnIndex].tasks.push(task);
        moveMyTask(newMyTasks);
    };

    const delIconClick = (event, { columnIndex, index, id }) => {
        event.stopPropagation();
        // TODO: comunicate with backend `deleteTodo`, if delete successfully then run the following
        const newMyTasks = [...myTasks];
        newMyTasks[columnIndex].tasks.splice(index, 1);
        moveMyTask(newMyTasks);
    }
    const addTodo = (title) => {
        // TODO: comunicate with backend `addTodo`, if add successfully then run
        // TODO: trigger input form
        alert('add ' + title);
    }

    const editTodo = ({ columnIndex, index, id, name }) => {
        // TODO: comunicate with backend `updateTodo`, if update successfully then run
        // TODO: trigger input form
        // alert('edit ' + name);
        setColumnIndex(columnIndex);
        setIndex(index);
        setId(id);
        setName(name);

        setModalOpen(true);
    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            console.log(Count);
            return;
        }
        else {
            const newMyTasks = [...myTasks];

            const editedEvent = {
                category: newMyTasks[_columnIndex].tasks[_index].category,
                color: color,
                completedDay: newMyTasks[_columnIndex].tasks[_index].completedDay,
                deadLine: choosedate,
                id: newMyTasks[_columnIndex].tasks[_index].id,
                name: title,
                subject: newMyTasks[_columnIndex].tasks[_index].subject,
                userID: newMyTasks[_columnIndex].tasks[_index].userID
            };
            newMyTasks[_columnIndex].tasks.splice(_index, 1);
            newMyTasks[_columnIndex].tasks.splice(_index, 0, editedEvent)
            console.log(editedEvent);

            moveMyTask(newMyTasks);
        }
    }, [Count])

    return (
        <DndProvider backend={HTML5backend}>
            <CustomDragLayer />
            <div className="task-board" style={{
                display: "grid",
                gridTemplateColumns: "33% 34% 33%",
                padding: '0px'
            }}>
                {
                    myTasks.map((tasks, columnIndex) => (
                        <Column key={`column ${columnIndex}`} {...{ tasks, columnIndex, handleMoveMyTask, delIconClick, addTodo, editTodo }} />
                    ))
                }
            </div>
            <Modal
                key='modal1'
                open={modalOpen}
                size='small'
                closeOnEscape={true}
                closeOnRootNodeClick={true}
            >
                <Header icon='browser' content='Event' />
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label> Event Title</label>
                            <input
                                placeholder='Event Title'
                                onChange={event => {
                                    setTitle(event.target.value);
                                    console.log("changed");
                                }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label> Color </label>
                            <CirclePicker onChangeComplete={(_color, event) => setColor(_color.hex)} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        negative
                        type='button'
                        icon='remove'
                        labelPosition='right'
                        onClick={
                            (e) => {
                                setModalOpen(false)
                            }
                        }
                        content='Cancel'
                    />
                    <Button
                        positive
                        type='button'
                        icon='checkmark'
                        labelPosition='right'
                        onClick={
                            (e) => {
                                setModalOpen(false);
                                setCount(Count + 1);
                            }
                        }
                        content='Confirm'
                    />
                </Modal.Actions>
            </Modal>
        </DndProvider>
    );
}

export default Todo
