import React, { useState, useEffect, useRef, useContext } from "react";
import { DndProvider } from "react-dnd";
import HTML5backend from "react-dnd-html5-backend";
import Column from "./TodoComponents/Column";
import CustomDragLayer from "./TodoComponents/CustomDragLayer";
import { Modal, Header, Form, Button, Checkbox, Input, Dropdown } from 'semantic-ui-react'
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

const Week = ({ handleBlockChange }) => {
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
    const [choosedate, setChoosedate] = useState(moment(new Date).add(_columnIndex, 'days').format("YYYY/MM/DD"))
    const [startTime, setStartTime] = useState(false)
    const [endTime, setEndTime] = useState(false)
    const [Count, setCount] = useState(0)
    const [color, setColor] = useState()
    const [title, setTitle] = useState()
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
        for (let i = 0; i < 7; ++i) {
            newTasks[i] = {
                title: moment(new Date).add(i, 'days').format("MM/DD"),
                tasks: tasks.filter(task => {
                    return task.Day === moment(new Date).add(i, 'days').format("YYYY/MM/DD")
                })
            }
        }
        return newTasks
    }

    const [myTasks, moveMyTask] = useState(parseQueryData([{}]));
    const { user } = useContext(AuthContext)
    const [updateBlock] = useMutation(UPDATE_BLOCK)
    const [deleteBlock] = useMutation(DELETE_BLOCK)
    const [addBlock] = useMutation(ADD_BLOCK)
    const Today = moment(new Date).format("YYYY/MM/DD");
    const { refetch } = useQuery(GET_WEEK_BLOCKS, { variables: { date: Today } })

    const [desireName, setDesiredName] = useState();
    const [desiredDate, setDesiredDate] = useState();
    const [desiredStartTime, setDesiredStartTime] = useState();
    const [desiredEndTime, setDesiredEndTime] = useState();

    const eventData = ({ columnIndex, index }) => {
        const newMyTasks = [...myTasks];
        console.log("Here " + newMyTasks[columnIndex].tasks[index].name);
        console.log("Here " + newMyTasks[columnIndex].tasks[index].Day);
        console.log("Here " + newMyTasks[columnIndex].tasks[index].startTime);
        console.log("Here " + newMyTasks[columnIndex].tasks[index].endTime);
        setDesiredName(newMyTasks[columnIndex].tasks[index].name);
        setDesiredDate(newMyTasks[columnIndex].tasks[index].Day);
        setDesiredStartTime(newMyTasks[columnIndex].tasks[index].startTime);
        setDesiredEndTime(newMyTasks[columnIndex].tasks[index].endTime);
    }

    const Clock = [
        { key: 0, value: 0, text: 0 },
        { key: 1, value: 1, text: 1 },
        { key: 2, value: 2, text: 2 },
        { key: 3, value: 3, text: 3 },
        { key: 4, value: 4, text: 4 },
        { key: 5, value: 5, text: 5 },
        { key: 6, value: 6, text: 6 },
        { key: 7, value: 7, text: 7 },
        { key: 8, value: 8, text: 8 },
        { key: 9, value: 9, text: 9 },
        { key: 10, value: 10, text: 10 },
        { key: 11, value: 11, text: 11 },
        { key: 12, value: 12, text: 12 },
        { key: 13, value: 13, text: 13 },
        { key: 14, value: 14, text: 14 },
        { key: 15, value: 15, text: 15 },
        { key: 16, value: 16, text: 16 },
        { key: 17, value: 17, text: 17 },
        { key: 18, value: 18, text: 18 },
        { key: 19, value: 19, text: 19 },
        { key: 20, value: 20, text: 20 },
        { key: 21, value: 21, text: 21 },
        { key: 22, value: 22, text: 22 },
        { key: 23, value: 23, text: 23 },

    ]

    useEffect(async () => {
        const newTasks = await refetch()
        moveMyTask(parseQueryData(newTasks.data.getWeek))
    }, [user])

    const _updateBlock = (editedEvent) => {
        updateBlock({
            variables: {
                blockID: editedEvent.id,
                name: editedEvent.name,
                subject: editedEvent.subject,
                color: editedEvent.color,
                onCalendar: editedEvent.onCalendar,
                startTime: editedEvent.startTime,
                endTime: editedEvent.endTime,
                Day: editedEvent.Day,
                isReview: editedEvent.isReview,
                repeated: editedEvent.repeated
            }
        })
        handleBlockChange();
    }

    const _addBlock = async (editedEvent) => {
        const b = await addBlock({
            variables: {
                name: editedEvent.name,
                subject: editedEvent.subject,
                color: editedEvent.color,
                onCalendar: editedEvent.onCalendar,
                startTime: editedEvent.startTime,
                endTime: editedEvent.endTime,
                Day: editedEvent.Day,
                isReview: editedEvent.isReview,
                repeated: editedEvent.repeated
            }
        })
        handleBlockChange();
        return b.data.addBlock.id
    }

    const handleMoveMyTask = (from, to) => {
        // TODO: comunicate with backend `updateTodo`, if update successfully then run
        // TODO: else CRASH(server error?)
        const { task, columnIndex: fromColumnIndex, index } = from;
        const { columnIndex: toColumnIndex } = to;

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
                Day: moment(new Date).add(toColumnIndex, 'days').format("YYYY/MM/DD"),
                isReview: task.isReview,
                repeated: task.repeated,
                expiredAfter: task.expiredAfter,
                blockExpiresDay: task.blockExpiresDay
            }
            newMyTasks[toColumnIndex].tasks.push(temptask);
            moveMyTask(newMyTasks);
            alert('Task Deadline is changed to ' + moment(new Date).add(toColumnIndex, 'days').format("YYYY-MM-DD"));
            _updateBlock(temptask)
        }
        else if (fromColumnIndex === -1) {
            setFromSide(true);
            const tempid = task.id;
            setUserid(task.userID);
            setSubject(task.subject);
            setcolor('#fff');
            setOnCalendar(false);
            setExpiredAfter(10);
            setBlockExpiresDay(10);
            const tempname = task.name;
            const tempindex = newMyTasks[toColumnIndex].tasks.length - 1;
            editTodo({
                columnIndex: toColumnIndex,
                index: tempindex,
                id: tempid,
                name: tempname
            });
        }
    };

    const delIconClick = (event, { columnIndex, index, id }) => {
        event.stopPropagation();
        // TODO: comunicate with backend `deleteTodo`, if delete successfully then run the following
        const newMyTasks = [...myTasks];
        newMyTasks[columnIndex].tasks.splice(index, 1);
        moveMyTask(newMyTasks);
        deleteBlock({ variables: { blockID: id } })
        handleBlockChange();
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

        if (index != -1) {
            eventData({ columnIndex, index });
        }

        setModalOpen(true);
    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        else {
            const newMyTasks = [...myTasks];
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
                _updateBlock(editedEvent)
            }
            else {
                _addBlock(editedEvent).then(success => {
                    console.log(success)
                    editedEvent.id = success
                })
            }

            const ComputedDay = dateChange ? choosedate : tempDay;

            const endcolumnIndex = moment(ComputedDay).format("DD") - moment(new Date).format("DD");
            if (endcolumnIndex !== _columnIndex) {
                newMyTasks[endcolumnIndex].tasks.push(editedEvent);
            }
            else {
                newMyTasks[_columnIndex].tasks.splice(_index, 0, editedEvent);
            }

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

    const handleOnChangeStart = (e, { value }) => {
        setStartTime(value);
        setStartTimeChange(true);
        console.log(value);
    }
    const handleOnChangeEnd = (e, { value }) => {
        setEndTime(value);
        setEndTimeChange(true);
        console.log(value);
    }


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
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label> Event Title</label>
                                <Input
                                    error
                                    placeholder={desireName}
                                    onChange={event => {
                                        setTitle(event.target.value);
                                        setTitleChange(true);
                                    }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label> Tag </label>
                                <Input
                                    error
                                    placeholder={_subject}
                                    onChange={event => {
                                        setSubject(event.target.value);
                                    }}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <label> Date</label>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="yyyy-MM-dd"
                                        id="date-picker-inline"
                                        value={dateChange ? choosedate : moment(new Date).add(_columnIndex, 'days').format("YYYY/MM/DD")}
                                        onChange={(date) => {
                                            console.log(date.toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' }))
                                            setChoosedate(date.toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' }));
                                            setDateChange(true);
                                        }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Form.Field>
                            <Form.Field>
                                <label> Start Time</label>
                                <Dropdown
                                    placeholder={desiredStartTime}
                                    fluid
                                    search
                                    selection
                                    options={Clock}
                                    onChange={handleOnChangeStart}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label> End Time</label>
                                <Dropdown
                                    placeholder={desiredEndTime}
                                    fluid
                                    search
                                    selection
                                    options={Clock}
                                    onChange={handleOnChangeEnd}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
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
                                defaultChecked={onCalendar}
                                onChange={() => {
                                    const temp = onCalendar ? false : true;
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
                                        setRepeated(parseInt(event.target.value));
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
                                console.log("startTime " + startTime);
                                console.log("endTime " + endTime);
                                const GoodTitle = (!title) ? false : ((title.replace(/\s/g, "").length !== 0) ? true : false)
                                var Message = "";

                                if (!GoodTitle) {
                                    Message = Message + "Title can't be empty! \n";
                                }


                                if (startTime > endTime) {
                                    Message = Message + "EndTime must >= StartTime";
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

export default Week;