import React, { useState, useEffect, useRef, useContext } from "react";
import { DndProvider } from "react-dnd";
import HTML5backend from "react-dnd-html5-backend";
import Column from "./TodoComponents/Column";
import CustomDragLayer from "./TodoComponents/CustomDragLayer";
import { Modal, Header, Form, Button, Checkbox } from 'semantic-ui-react'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import "react-datepicker/dist/react-datepicker.css";
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment"
import { TwitterPicker, CirclePicker } from 'react-color';

import './Todo.scss';


import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_WEEK_BLOCKS, UPDATE_BLOCK, DELETE_BLOCK, ADD_BLOCK } from '../graphql'
import { AuthContext } from '../context/auth';
import { testTodos } from './../config';

const Week = () => {
    // const data = { 'getTodo': testTodos }
    const [_columnIndex, setColumnIndex] = useState(0)
    const [_index, setIndex] = useState()
    const [_id, setId] = useState()
    const [_userid, setUserid] = useState()
    const [_name, setName] = useState()
    const [_subject, setSubject] = useState()
    const [_color, setcolor] = useState()
    const [_expiredAfter, setExpiredAfter] = useState()
    const [_blockExpiresDay, setBlockExpiresDay] = useState()
    const firstUpdate = useRef(true);

    const [modalOpen, setModalOpen] = useState(false)
    const [choosedate, setChoosedate] = useState(moment(new Date).add(_columnIndex, 'days'))
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [Count, setCount] = useState(0)
    const [color, setColor] = useState()
    const [title, setTitle] = useState('Event Title')
    const [onCalendar, setOnCalendar] = useState(false)
    const [isReview, setIsReview] = useState(false)
    const [repeated, setRepeated] = useState(0)
    const options = [
        { key: 'm', text: 'Male', value: 'male' },
        { key: 'f', text: 'Female', value: 'female' },
        { key: 'o', text: 'Other', value: 'other' },
    ]
    const [dateChange, setDateChange] = useState(false)
    const [startTimeChange, setStartTimeChange] = useState(false)
    const [endTimeChange, setEndTimeChange] = useState(false)
    const [colorChange, setColorChange] = useState(false)
    const [titleChange, setTitleChange] = useState(false)
    const [RepeatedChange, setRepeatedChange] = useState(false)

    const [fromSide, setFromSide] = useState(false)

    const parseQueryData = (tasks) => {
        const newTasks = []
        console.log(tasks)
        for (let i = 0; i < 7; ++i) {
            newTasks[i] = {
                title: moment(new Date).add(i, 'days').format("MM/DD"),
                tasks: tasks.filter(task => {
                    return task.Day === moment(new Date).add(i, 'days').format("YYYY/MM/DD")
                })
            }
        }
        console.log(newTasks)
        return newTasks
    }

    const [myTasks, moveMyTask] = useState(parseQueryData([{}]));
    const { user } = useContext(AuthContext)
    const [updateBlock] = useMutation(UPDATE_BLOCK)
    const [deleteBlock] = useMutation(DELETE_BLOCK)
    const [addBlock] = useMutation(ADD_BLOCK)
    const Today = moment(new Date).format("YYYY/MM/DD");
    const { refetch } = useQuery(GET_WEEK_BLOCKS, { variables: { date: Today } })

    useEffect(async () => {
        const newTasks = await refetch()
        console.log(newTasks)
        moveMyTask(parseQueryData(newTasks.data.getWeek))
        console.log(myTasks)
    }, [user])

    const handleMoveMyTask = (from, to) => {
        // TODO: comunicate with backend `updateTodo`, if update successfully then run
        // TODO: else CRASH(server error?)
        const { task, columnIndex: fromColumnIndex, index } = from;
        console.log({ 'columnidx': fromColumnIndex })
        const { columnIndex: toColumnIndex } = to;
        console.log({
            from, to
        })

        const newMyTasks = [...myTasks];
        // remove task
        if (fromColumnIndex !== -1) {
            newMyTasks[fromColumnIndex].tasks.splice(index, 1);
            // move task
            const temptask = {
                id: task.id,
                userID: task.userID,
                name: task.name,
                subject: task.subject,
                color: task.color,
                onCalendar: task.onCalendar,
                startTime: task.startTime,
                endTime: task.endTime,
                Day: moment(new Date).add(toColumnIndex, 'days').format("YYYY-MM-DD"),
                isReview: task.isReview,
                repeated: task.repeated,
                expiredAfter: task.expiredAfter,
                blockExpiresDay: task.blockExpiresDay
            }
            newMyTasks[toColumnIndex].tasks.push(temptask);
            moveMyTask(newMyTasks);
            alert('Task Deadline is changed to ' + moment(new Date).add(toColumnIndex, 'days').format("YYYY-MM-DD"));
        }
        else if (fromColumnIndex === -1) {
            setFromSide(true);
            const tempid = task.id;
            setUserid(task.userID);
            setSubject(task.subject);
            setcolor(task.color);
            setOnCalendar(task.onCalendar);
            setExpiredAfter(task.expiredAfter);
            setBlockExpiresDay(task.blockExpiresDay);
            const tempname = task.subject;
            const tempindex = newMyTasks[toColumnIndex].tasks.length - 1;
            console.log({ toColumnIndex, tempindex, tempid, tempname });
            editTodo({
                columnIndex: toColumnIndex,
                index: tempindex,
                id: tempid,
                name: tempname
            });
        }
    };

    const delIconClick = (event, { columnIndex, index, id }) => {
        console.log('week')
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
        console.log({ columnIndex, index, id, name });
        setColumnIndex(columnIndex);
        setIndex(index);
        setId(id);
        setName(name);

        setModalOpen(true);
    }

    useEffect(() => {
        console.log("useEffect Changed");

        if (firstUpdate.current) {
            firstUpdate.current = false;
            console.log(Count);
            return;
        }
        else {
            const newMyTasks = [...myTasks];
            console.log(newMyTasks);
            console.log(_columnIndex);
            const tempDay = moment(new Date).add(_columnIndex, 'days').format("YYYY-MM-DD");
            const editedEvent = {
                id: fromSide ? _id : newMyTasks[_columnIndex].tasks[_index].id,
                userID: fromSide ? _id : newMyTasks[_columnIndex].tasks[_index].userID,
                name: fromSide ? (titleChange ? title : _name) : (titleChange ? title : newMyTasks[_columnIndex].tasks[_index].name),
                subject: fromSide ? _subject : newMyTasks[_columnIndex].tasks[_index].subject,
                color: fromSide ? (colorChange ? color : _color) : (colorChange ? color : newMyTasks[_columnIndex].tasks[_index].color),
                onCalendar: onCalendar,
                startTime: startTime,
                endTime: endTime,
                Day: dateChange ? choosedate : tempDay,
                isReview: isReview,
                repeated: repeated,
                expiredAfter: fromSide ? _expiredAfter : newMyTasks[_columnIndex].tasks[_index].expiredAfter,
                blockExpiresDay: fromSide ? _blockExpiresDay : newMyTasks[_columnIndex].tasks[_index].blockExpiresDay
            };
            // I'm Here
            if (!fromSide) {
                newMyTasks[_columnIndex].tasks.splice(_index, 1);
            }

            const ComputedDay = dateChange ? choosedate : tempDay;

            const endcolumnIndex = moment(ComputedDay).format("DD") - moment(new Date).format("DD");
            console.log(endcolumnIndex);
            if (endcolumnIndex !== _columnIndex) {
                newMyTasks[endcolumnIndex].tasks.push(editedEvent);
            }
            else newMyTasks[_columnIndex].tasks.splice(_index, 0, editedEvent);

            moveMyTask(newMyTasks);

            setDateChange(false);
            setStartTimeChange(false);
            setEndTimeChange(false);
            setColorChange(false);
            setTitleChange(false);
            setRepeatedChange(false);
            setFromSide(false);
        }
    }, [Count])


    return (
        <DndProvider backend={HTML5backend}>
            <CustomDragLayer />
            <div className="task-board" style={{
                display: "grid",
                gridTemplateColumns: "14% 16% 14% 14% 14% 14% 14%",
                padding: '0px'
            }}>
                {
                    myTasks.map((tasks, columnIndex) => (
                        <Column
                            key={`column-week ${columnIndex}`}
                            {...{ tasks, columnIndex, handleMoveMyTask, delIconClick, addTodo, editTodo }}
                            WEEK
                        />
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
                                placeholder={_name}
                                onChange={event => {
                                    setTitle(event.target.value);
                                    setTitleChange(true);
                                    console.log("changed");
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
                                        label="Date"
                                        value={dateChange ? choosedate : moment(new Date).add(_columnIndex, 'days')}
                                        onChange={(date) => {
                                            setChoosedate(date);
                                            setDateChange(true);
                                        }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Form.Field>
                            <Form.Field>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardTimePicker
                                        id="time-picker"
                                        label="Start Time"
                                        value={startTime}
                                        onChange={(date) => {
                                            setStartTime(date);
                                            setStartTimeChange(true);
                                        }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Form.Field>
                            <Form.Field>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardTimePicker
                                        id="time-picker"
                                        label="End Time"
                                        value={endTime}
                                        onChange={(date) => {
                                            setEndTime(date);
                                            setEndTimeChange(true);
                                        }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Select
                                label='Tag'
                                options={options}
                                placeholder='Event Type'
                            />
                            <Form.Field>
                                <label> Color </label>
                                <CirclePicker
                                    onChangeComplete={(__color, event) => {
                                        setColor(__color.hex);
                                        setColorChange(true);
                                    }}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <label> Show on Calendar </label>
                            <Checkbox
                                toggle
                                onChange={() => {
                                    const temp = onCalendar ? false : true;
                                    console.log("set onCalendar " + temp);
                                    setOnCalendar(temp);
                                }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label> Review at the end of day </label>
                            <Checkbox
                                toggle
                                onChange={() => {
                                    const temp = isReview ? false : true;
                                    console.log("set isReview " + temp);
                                    setIsReview(temp);
                                }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label> Repeated </label>
                            <Form.Group>
                                <input
                                    style={{ width: "5vw" }}
                                    placeholder="None"
                                    onChange={event => {
                                        setRepeated(event.target.value);
                                        setRepeatedChange(true);
                                    }}
                                />
                                <Form.Field>
                                    <label> Weeks </label>
                                </Form.Field>
                            </Form.Group>
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

export default Week;