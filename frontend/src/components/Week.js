import React, { useEffect, useState, useRef, memo } from "react";
import { Modal, Header, Form, Input, TextArea, Button, Select, Icon } from 'semantic-ui-react'
import "./styles.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import PropTypes from 'prop-types'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateFormat";
// import MyModal from './MyModal';

const WeekStyle = {
    background: "#FFFFFF"
}

const Week = () => {
    const [state, setState] = useState({
        weekendsVisible: true,
        calendarEvents: [
            {
                id: 1,
                title: "Sleep",
                color: "#388e3c",
                start: "2021-01-19T00:00:00",
                end: "2021-01-19T08:00:00"
            }
        ]
    });
    const [modalOpen, setModalOpen] = useState(false)

    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [color, setColor] = useState()
    const [title, setTitle] = useState()
    const [id, setId] = useState('0')
    
    const options = [
        { key: 'm', text: 'Male', value: 'male' },
        { key: 'f', text: 'Female', value: 'female' },
        { key: 'o', text: 'Other', value: 'other' },
    ]
    
    const handleEventReceive = (eventInfo) => {
        console.log(eventInfo);
        setModalOpen(true);      
    };

    useEffect(() => {
        console.log("setModalOpen changes")
        const newEvent = {
            //id: id,
            //title: title,
            //color: color,
            start: startDate,
            end: endDate,
        };

        setState((state) => {
            return {
                ...state,
                calendarEvents: state.calendarEvents.concat(newEvent)
            };
        });
    }, state)

    return (
        <div style={WeekStyle} className="Week">
            <FullCalendar
                height="100%"
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridWeek"
                headerToolbar={false}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={state.weekendsVisible}
                events={state.calendarEvents}
                droppable={true}
                eventReceive={handleEventReceive}
            />
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
                        <Form.Field
                            id='form-input-control-event-title'
                            control={Input}
                            label='Event Title'
                            placeholder='Event Title'
                        />
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <Form.Field
                                    id='form-input-control-start-time'
                                    label='Start Time'
                                />
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => { setStartDate(date) }}
                                    showTimeSelect={true}
                                    timeIntervals={15}
                                    dateFormat="yyyy-MM-dd hh:mm:ss"
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Field
                                    id='form-input-control-end-time'
                                    label='End Time'
                                />
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => { setEndDate(date) }}
                                    showTimeSelect={true}
                                    timeIntervals={15}
                                    dateFormat="yyyy-MM-dd hh:mm:ss"
                                />
                            </Form.Field>
                            <Form.Select
                                label='Tag'
                                options={options}
                                placeholder='Event Type'
                            />
                        </Form.Group>
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
                                setModalOpen(false)
                            }
                        }
                        content='Confirm'
                    />
                </Modal.Actions>
            </Modal>

        </div>
    );
}


/*
Modal.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    valueIntoModal: PropTypes.string.isRequired
}*/

export default Week
