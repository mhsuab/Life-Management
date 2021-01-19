import React, { useEffect, useState, useRef, memo } from "react";
import "./styles.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import MyModal from './MyModal';

const ExternalEvent = memo(({ event }) => {
    let elRef = useRef(null);


    useEffect(() => {
        let draggable = new Draggable(elRef.current, {
            eventData: function () {
                return { ...event, create: true };
            }
        });

        // a cleanup function
        return () => draggable.destroy();
    });

    return (
        <div
            ref={elRef}
            className="fc-event fc-h-event mb-1 fc-daygrid-event fc-daygrid-block-event p-2"
            title={event.title}
            style={{
                backgroundColor: event.color,
                borderColor: event.color,
                cursor: "pointer"
            }}
        >
            <div className="fc-event-main">
                <div>
                    <strong>{event.title}</strong>
                </div>
            </div>
        </div>
    );
});

const SideFunction=()=> {
    const [state, setState] = useState({
        weekendsVisible: true,
        externalEvents: [
            { title: "Art 1", color: "#0097a7", id: 34432 },
            { title: "Art 2", color: "#f44336", id: 323232 },
            { title: "Art 3", color: "#f57f17", id: 1111 },
            { title: "Art 4", color: "#90a4ae", id: 432432 }
        ],
        calendarEvents: [
            {
                id: 1,
                title: "All-day event",
                color: "#388e3c",
                start: "2020-12-12",
                end: "2020-12-12"
            },
            {
                id: 2,
                title: "Timed event",
                color: "#0097a7",
                start: "2020-12-07",
                end: "2020-12-10"
            }
        ]
    });
    // add external events
    const addEvent = () => {
        let newEvent = {
            id: 3433,
            title: "Timed event",
            color: "#333333",
            start: "2020-12-31",
            end: "2020-12-31",
            custom: "custom stuff"
        };

        setState((state) => {
            return {
                ...state,
                externalEvents: state.externalEvents.concat(newEvent)
            };
        });
    };
    return (
        <div style={{ float: "left", width: "25%" }}>
            <div style={{ margin: "0 0 20px" }}>
                <input
                    type="submit"
                    name="name"
                    onClick={addEvent}
                    value="add external event"
                />
            </div>
            <div id="external-events">
                {state.externalEvents.map((event) => (
                    <ExternalEvent key={event.id} event={event} />
                ))}
            </div>
        </div>
    )
}

const WeekFunction = () => {
    const [state, setState] = useState({
        weekendsVisible: true,
        externalEvents: [
            { title: "Art 1", color: "#0097a7", id: 34432 },
            { title: "Art 2", color: "#f44336", id: 323232 },
            { title: "Art 3", color: "#f57f17", id: 1111 },
            { title: "Art 4", color: "#90a4ae", id: 432432 }
        ],
        calendarEvents: [
            {
                id: 1,
                title: "All-day event",
                color: "#388e3c",
                start: "2020-12-12",
                end: "2020-12-12"
            },
            {
                id: 2,
                title: "Timed event",
                color: "#0097a7",
                start: "2020-12-07",
                end: "2020-12-10"
            }
        ]
    });
    const [modalOpen, setModalOpen] = useState(false)
    const handleEventReceive = (eventInfo) => {
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

        setModalOpen(true);
    };
    return (
        <div style={{ float: "left", width: "75%" }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={false}
                initialView="dayGridWeek"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={state.weekendsVisible}
                events={state.calendarEvents}
                droppable={true}
                eventReceive={handleEventReceive}
            />
            <MyModal // The invisible modal itself
                key='modal1'
                modalOpen={modalOpen}
                handleClose={
                    (e) => {
                        setModalOpen(false)
                    }
                }
            />
        </div>
    );
}

export default function CalTest() {
    
    return (
        <div className="App">
            <SideFunction/>
            <WeekFunction/>
        </div>
    );
}

//import React from 'react'
//import MyModal from './MyModal';
//import { Button, Grid } from 'semantic-ui-react';

//class CalTest extends React.Component {

//    constructor(props) {
//        super(props);

//        this.state = {
//            modalOpen: false,
//            valueIntoModal: "123456abcdef"
//        }
//    }

//    render() {
//        return ([
//            <Button // Button to click to activate the Modal
//                key='button1'
//                primary
//                content='Click!'
//                onClick={
//                    () => {
//                        this.setState({ modalOpen: true })
//                    }
//                }
//            />,
//            <MyModal // The invisible modal itself
//                key='modal1'
//                modalOpen={this.state.modalOpen}
//                handleClose={
//                    () => {
//                        this.setState({ modalOpen: false })
//                    }
//                }
//                valueIntoModal={this.state.valueIntoModal}
//            />
//        ])
//    }
//}

//export default CalTest