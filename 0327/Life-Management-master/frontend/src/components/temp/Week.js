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
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const options = [
        { key: 'm', text: 'Male', value: 'male' },
        { key: 'f', text: 'Female', value: 'female' },
        { key: 'o', text: 'Other', value: 'other' },
    ]
    const [modalOpen, setModalOpen] = useState(false)
    const handleEventReceive = (eventInfo) => {
        console.log(eventInfo);
        setModalOpen(true);
        const newEvent = {
            id: eventInfo.draggedEl.getAttribute("data-id"),
            title: eventInfo.draggedEl.getAttribute("title"),
            color: eventInfo.draggedEl.getAttribute("data-color"),
            start: eventInfo.date,
            end: eventInfo.date,
            custom: eventInfo.draggedEl.getAttribute("data-custom")
        };

        setState((state) => {
            return {
                ...state,
                calendarEvents: state.calendarEvents.concat(newEvent)
            };
        });        
    };
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
                                    dateFormat="MM/dd/yyyy h:mm aa"
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
                                    dateFormat="MM/dd/yyyy h:mm aa"
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
Modal.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    valueIntoModal: PropTypes.string.isRequired
}

export default Week
