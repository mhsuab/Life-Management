import React, { useState, useEffect, useRef } from "react";
import { DndProvider } from "react-dnd";
import HTML5backend from "react-dnd-html5-backend";
import Column from "./TodoComponents/Column";
import CustomDragLayer from "./TodoComponents/CustomDragLayer";
import { Modal, Header, Form, Input, TextArea, Button, Select, Icon } from 'semantic-ui-react'
import { TwitterPicker, CirclePicker } from 'react-color';
import './Todo.scss';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_EMPTY_BLOCKS, ADD_EMPTY_BLOCK, DELETE_EMPTY_BLOCK, UPDATE_EMPTY_BLOCK } from '../graphql'
import { AuthContext } from '../context/auth';
import { testTodos, testEmptyBlock } from './../config';


const Todo = () => {
    // const { user } = useContext(AuthContext)
    // const {  refetch } = useQuery(GET_TODOS)
    // const [ updateEmpty ] = useMutation(UPDATE_EMPTY_BLOCK)
    // const [ deleteEmpty ] = useMutation(DELETE_EMPTY_BLOCK)
    // const [ addEmpty ] = useMutation(ADD_EMPTY_BLOCK)
    const loading = true;
    const data = testEmptyBlock

    const parseQueryData = (todos) => {
        return {
            title: 'event template',
            tasks: todos
        };
    }
    const [myTasks, moveMyTask] = useState(parseQueryData(data.getEmptyBlock));

    const [modalOpen, setModalOpen] = useState(false)
    const firstUpdate = useRef(true);

    const [_color, setColor] = useState();
    const [_subject, setSubject] = useState();
    const [Count, setCount] = useState(0)

    const [_index, setIndex] = useState(0)
    const [_id, setId] = useState()
    const [_userid, setUserid] = useState()
    const [_name, setName] = useState()

    const [color, setcolor] = useState();
    const [subject, setsubject] = useState();

    const [subjectChange, setSubjectChange] = useState(false)
    const [colorChange, setColorChange] = useState(false)

    const [newEvent, setNewEvent] = useState(false)

    const handleMoveMyTask = (from, to) => {
        // TODO: comunicate with backend `updateTodo`, if update successfully then run
        // TODO: else CRASH(server error?)
        const { task, columnIndex: fromColumnIndex, index } = from;
        const { columnIndex: toColumnIndex } = to;

        const temptask = {
            color: task.color,
            id: task.id,
            index: task.index,
            name: task.name,
            subject: task.subject,
            userID: task.userID
        }

        const newMyTasks = myTasks;
        newMyTasks.tasks.splice(index, 1);
        newMyTasks.tasks.splice(index, 0, temptask);
        // remove task
        // newMyTasks[fromColumnIndex].tasks.splice(index, 1);
        // // move task
        // newMyTasks[toColumnIndex].tasks.push(task);
        moveMyTask(newMyTasks);
    };

    const delIconClick = (event, { index, id }) => {
        event.stopPropagation();
        // TODO: comunicate with backend `deleteTodo`, if delete successfully then run the following
        const newMyTasks = myTasks;
        newMyTasks.tasks.splice(index, 1);
        moveMyTask(newMyTasks);
    }

    const addTodo = ({ columnIndex, index, id, name }) => {
        // TODO: comunicate with backend `addTodo`, if add successfully then run
        // TODO: trigger input form
        // alert('add ' + title);
        setNewEvent(true);
        editTodo({ columnIndex, index, id, name });
    }

    const editTodo = ({ columnIndex, index, id, name }) => {
        // TODO: comunicate with backend `updateTodo`, if update successfully then run
        // TODO: trigger input form
        //alert('edit ' + name);

        setIndex(index);
        setId(id);
        setName(name);
        setNewEvent(false);
        setModalOpen(true);

    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        else {
            const newMyTasks = myTasks;
            const editedEvent = {
                id: _id,
                userID: _userid,
                name: _name,
                subject: subjectChange ? subject : _subject,
                color: colorChange ? color : _color,
            };
            // I'm Here

            newMyTasks.tasks.push(editedEvent);

            moveMyTask(newMyTasks);

            setSubjectChange(false);
            setColorChange(false);
        }
    }, [Count])

    return (
        <DndProvider backend={HTML5backend}>
            <CustomDragLayer />
            <div className="task-board" style={{
                width: '100%'
            }}>
                <Column
                    key={`column-week -1`}
                    {...{ tasks: myTasks, columnIndex: -1, handleMoveMyTask, delIconClick, addTodo, editTodo }}
                    SIDEBAR
                />
            </div>
            <Modal
                key='modal1'
                open={modalOpen}
                size='small'
                closeOnEscape={true}
                closeOnRootNodeClick={true}
            >
                <Header icon='browser' content='Todo' />
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label> Subject </label>
                            <input
                                placeholder={_subject}
                                onChange={event => {
                                    setsubject(event.target.value);
                                    setSubjectChange(true);
                                    console.log("changed");
                                }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label> Color </label>
                            <CirclePicker
                                onChangeComplete={(_color, event) => {
                                    setcolor(_color.hex);
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
                                const GoodTitle = (!subject) ? false : ((subject.replace(/\s/g, "").length !== 0) ? true : false)
                                var Message = "";

                                if (!GoodTitle) {
                                    Message = Message + "Please enter the subject! \n";
                                }
                                if (Message === "") {
                                    setModalOpen(false);
                                    setCount(Count + 1);
                                }
                                else {
                                    alert(Message);
                                }
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
