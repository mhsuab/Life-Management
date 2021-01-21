import React, { useState, useEffect, useRef, useContext } from "react";
import { DndProvider } from "react-dnd";
import HTML5backend from "react-dnd-html5-backend";
import Column from "./TodoComponents/Column";
import CustomDragLayer from "./TodoComponents/CustomDragLayer";
import { Modal, Header, Form, Button } from 'semantic-ui-react'
import { CirclePicker } from 'react-color';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import "react-datepicker/dist/react-datepicker.css";
import DateFnsUtils from '@date-io/date-fns';

import './Todo.scss';

import { GET_TODOS, ADD_TODO, DELETE_TODO, UPDATE_TODO, } from '../graphql';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';

const Todo = () => {
    const { user } = useContext(AuthContext)
    const { refetch } = useQuery(GET_TODOS)
    const [updateTodo] = useMutation(UPDATE_TODO)
    const [deleteTodo] = useMutation(DELETE_TODO)
    const [addTodoToDB] = useMutation(ADD_TODO)

    const [newEvent, setNewEvent] = useState(false)
    const [_columnIndex, setColumnIndex] = useState()
    const [_index, setIndex] = useState()
    const [_id, setId] = useState()
    const [_name, setName] = useState()
    const [_subject, setSubject] = useState('none')
    const [_userid, setUserId] = useState()

    const firstUpdate = useRef(true);
    const today = new Date();

    const [modalOpen, setModalOpen] = useState(false)
    const [choosedate, setChoosedate] = useState(today.toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' }))
    const [Count, setCount] = useState(0)
    const [color, setColor] = useState()
    const [title, setTitle] = useState('Event Title')

    const [colorChange, setColorChange] = useState(false)
    const [titleChange, setTitleChange] = useState(false)

    const parseQueryData = (todos) => {
        return [
            {
                title: 'Todo',
                tasks: todos.filter(todo => {
                    return todo.category === 'Todo'
                })
            },
            {
                title: 'Doing',
                tasks: todos.filter(todo => {
                    return todo.category === 'Doing'
                })
            },
            {
                title: 'Completed',
                tasks: todos.filter(todo => {
                    return todo.category === 'Completed'
                })
            }
        ];
    }
    const [myTasks, moveMyTask] = useState(parseQueryData([{}]));

    useEffect(async () => {
        const t = await refetch()
        moveMyTask(parseQueryData(t.data.getTodo))
    }, [user])

    const handleMoveMyTask = (from, to) => {
        // TODO: comunicate with backend `updateTodo`, if update successfully then run
        // TODO: else CRASH(server error?)
        console.log(from)
        console.log(to)
        const { task, columnIndex: fromColumnIndex, index } = from;
        const { columnIndex: toColumnIndex } = to;
        const newMyTasks = [...myTasks];
        // remove task
        newMyTasks[fromColumnIndex].tasks.splice(index, 1);
        // move task
        const temptask = {
            category: toColumnIndex === 0 ? 'Todo' : (toColumnIndex === 1 ? 'Doing' : 'Completed'),
            color: task.color,
            completedDay: task.completedDay,
            deadLine: task.deadLine,
            id: task.id,
            name: task.name,
            subject: task.subject,
            userID: task.userID
        }
        newMyTasks[toColumnIndex].tasks.push(temptask);
        updateTodo({
            variables: {
                todoID: task.id,
                name: temptask.name,
                category: temptask.category,
                subject: temptask.subject,
                color: temptask.color,
                deadLine: temptask.deadLine
            }
        })
        moveMyTask(newMyTasks);
    };

    const delIconClick = (event, { columnIndex, index, id }) => {
        event.stopPropagation();
        // TODO: comunicate with backend `deleteTodo`, if delete successfully then run the following
        const newMyTasks = [...myTasks];
        newMyTasks[columnIndex].tasks.splice(index, 1);
        moveMyTask(newMyTasks);
        deleteTodo({ variables: { todoID: id } })
    }

    const addTodo = ({ columnIndex, index, id, name }) => {
        // TODO: comunicate with backend `addTodo`, if add successfully then run
        // TODO: trigger input form
        //alert('add ' + title);
        console.log("columnIndex " + columnIndex);
        setNewEvent(true);
        editTodo({ columnIndex, index, id, name });
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

    const _addTodo = async (editedEvent) => {
        const newTodo = await addTodoToDB({
            variables: {
                name: editedEvent.name,
                category: editedEvent.category,
                subject: editedEvent.subject,
                color: editedEvent.color,
                deadLine: editedEvent.deadLine
            }
        })
        console.log("addTodo function")
        return newTodo.data.addTodo.id
    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        else {
            console.log(_columnIndex)
            const newMyTasks = [...myTasks];
            const editedEvent = {
                category: newEvent ? (_columnIndex === 0 ? 'Todo' : (_columnIndex === 1 ? 'Doing' : 'Completed')) : newMyTasks[_columnIndex].tasks[_index].category,
                color: colorChange ? color : (newEvent ? '#555555' : newMyTasks[_columnIndex].tasks[_index].color),
                completedDay: newEvent ? '' : newMyTasks[_columnIndex].tasks[_index].completedDay,
                deadLine: choosedate,
                id: newEvent ? _id : newMyTasks[_columnIndex].tasks[_index].id,
                name: titleChange ? title : (newEvent ? (_columnIndex === 0 ? 'Todo' : (_columnIndex === 1 ? 'Doing' : 'Completed')) : newMyTasks[_columnIndex].tasks[_index].name),
                subject: newEvent ? _subject : newMyTasks[_columnIndex].tasks[_index].subject,
                userID: newEvent ? _userid : newMyTasks[_columnIndex].tasks[_index].userID
            };
            if (newEvent) {
                console.log("addTodo174")
                _addTodo(editedEvent).then(success => {
                    editedEvent.id = success
                })
                newMyTasks[_columnIndex].tasks.push(editedEvent);
            }
            else {
                newMyTasks[_columnIndex].tasks.splice(_index, 1);
                newMyTasks[_columnIndex].tasks.splice(_index, 0, editedEvent)
                updateTodo({
                    variables: {
                        todoID: editedEvent.id,
                        name: editedEvent.name,
                        category: editedEvent.category,
                        subject: editedEvent.subject,
                        color: editedEvent.color,
                        deadLine: editedEvent.deadLine
                    }
                })
            }


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
                <Header icon='browser' content={(_columnIndex === 0 ? 'Todo' : (_columnIndex === 1 ? 'Doing' : 'Completed'))} />
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label> Todo </label>
                            <input
                                placeholder={_name}
                                onChange={event => {
                                    setTitle(event.target.value);
                                    setTitleChange(true);
                                }}
                            />
                        </Form.Field>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="yyyy-MM-dd"
                                        id="date-picker-inline"
                                        label="Deadline (Date)"
                                        value={choosedate}
                                        onChange={(date) => {
                                            setChoosedate(date.toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' }));
                                        }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Form.Field>
                            <Form.Field>
                                <label> Tag </label>
                                <input
                                    placeholder={_subject}
                                    onChange={event => {
                                        setSubject(event.target.value);
                                    }}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <label> Color </label>
                            <CirclePicker
                                onChangeComplete={(_color, event) => {
                                    setColor(_color.hex);
                                    setColorChange(true);
                                }}
                                color={['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff']}
                            />
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