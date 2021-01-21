import React, { useState, useEffect, useRef, useContext } from "react";
import { DndProvider } from "react-dnd";
import HTML5backend from "react-dnd-html5-backend";
import Column from "./TodoComponents/Column";
import CustomDragLayer from "./TodoComponents/CustomDragLayer";
import { Modal, Header, Form, Button, Icon } from 'semantic-ui-react'
import { CirclePicker } from 'react-color';
import './Todo.scss';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_EMPTY_BLOCKS, ADD_EMPTY_BLOCK, DELETE_EMPTY_BLOCK, UPDATE_EMPTY_BLOCK } from '../graphql'
import { AuthContext } from '../context/auth';

const Todo = () => {
    const { user } = useContext(AuthContext)
    const {  refetch } = useQuery(GET_EMPTY_BLOCKS)
    const [ updateEmpty ] = useMutation(UPDATE_EMPTY_BLOCK)
    const [ deleteEmpty ] = useMutation(DELETE_EMPTY_BLOCK)
    const [ addEmpty ] = useMutation(ADD_EMPTY_BLOCK)

    const parseQueryData = (todos) => {
        return {
            title: 'TEMPLATE',
            tasks: todos
        };
    }
    const [myTasks, moveMyTask] = useState(parseQueryData([]));

    useEffect(async () => {
        const e = await refetch()
        moveMyTask(parseQueryData(e.data.getEmptyBlock))
    }, [user])

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

    const [del, setDel] = useState(false)

    const handleMoveMyTask = (from, to) => {
        // TODO: comunicate with backend `updateTodo`, if update successfully then run
        // TODO: else CRASH(server error?)
        const { task, columnIndex: fromColumnIndex, index } = from;
        const { columnIndex: toColumnIndex } = to;
        console.log("Move My Task " + task);
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
        console.log("Handle move empty block")
        updateEmpty({
            variables: {
                emptyBlockID: temptask.id,
                subject: temptask.subject,
                color: temptask.color
            }
        })
        moveMyTask(newMyTasks);
    };

    const delIconClick = (event, { index, id }) => {
        event.stopPropagation();
        // TODO: comunicate with backend `deleteTodo`, if delete successfully then run the following
        const newMyTasks = myTasks;
        setDel(true);
        setCount(Count + 1);
        newMyTasks.tasks.splice(index, 1);
        moveMyTask(newMyTasks);
        deleteEmpty({
            variables: {
                emptyBlockID: id
            }
        })
    }

    const addTodo = ({ index, id, name }) => {
        // TODO: comunicate with backend `addTodo`, if add successfully then run
        // TODO: trigger input form
        // alert('add ' + title);
      
        editTodo({ index, id, name });
    }

    const editTodo = ({ index, id, name }) => {
        // TODO: comunicate with backend `updateTodo`, if update successfully then run
        // TODO: trigger input form
        //alert('edit ' + name);

        setIndex(index);
        setId(id);
        setName(name);
        setModalOpen(true);
    }

    const _addEmpty = async (newEmpty) => {
        const e = await addEmpty({
            variables: {
                subject: newEmpty.subject,
                color: newEmpty.color
            }
        })
        return e.data.addEmptyBlock.id
    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        else {
            if (!del) {
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
                _addEmpty(editedEvent).then ( success => {
                    editedEvent.id = success
                })
            }
            setDel(false);
        }
    }, [Count])

    return (
        <div style={{ display: 'grid', gridTemplateRows: '2% 98%' }}>
            <b style={{background: '#434c5e', color: '#fff', width: '8vw', height: '2vh', borderRadius: '3px'}}>
                {myTasks.title}
                <Icon
                    link
                    inverted
                    name='edit'
                    size='small'
                    color='grey'
                    style={{ float: 'right' }}
                    onClick={() => addTodo({ _index, _id, _name })}
                />
            </b>
            <DndProvider backend={HTML5backend}>
                <CustomDragLayer />
                <div style={{
                    width: '100%',
                    height: '90vh',
                    display: 'inline-flex',
                    alignItems: 'flex-start',
                    padding: '1%',
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
            </DndProvider >
        </div>
    );
}

export default Todo
