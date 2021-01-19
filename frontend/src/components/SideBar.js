import React, { useEffect, useState, useRef, memo } from "react";
import "./styles.css";
import { sideBarColor } from './../config';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

const sideBarStyle = {
    height: '90vh',
    background: sideBarColor
}

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

const SideBar = () => {
    const [state, setState] = useState({
        weekendsVisible: true,
        externalEvents: [
            { title: "Art 1", color: "#0097a7", id: 34432 },
            { title: "Art 2", color: "#f44336", id: 323232 },
            { title: "Art 3", color: "#f57f17", id: 1111 },
            { title: "Art 4", color: "#90a4ae", id: 432432 }
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
        <div style={{ sideBarStyle }}>
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

export default SideBar