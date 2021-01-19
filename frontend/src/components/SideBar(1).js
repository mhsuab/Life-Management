/*
import React, { useEffect, useState, useRef, memo } from "react";
import "./styles.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

const SideBar = memo(({ event }) => {
    const [state, setState] = useState({
        weekendsVisible: true,
        externalEvents: [
            { title: "Art 1", color: "#0097a7", id: 34432 },
            { title: "Art 2", color: "#f44336", id: 323232 },
            { title: "Art 3", color: "#f57f17", id: 1111 },
            { title: "Art 4", color: "#90a4ae", id: 432432 }
        ],
        calendarEvents: []
    });
    let elRef = useRef(null);

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
                    <SideBar key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
/*
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
*/
import { requirePropFactory } from '@material-ui/core';
import React, { Component } from 'react';
import { sideBarColor } from './../config';
import { Col, Row } from "reactstrap";
import x from "../x.png";

const sideBarStyle = {
    height: '90vh',
    background: sideBarColor
}

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 4,
            events: [
                { title: "Event", key: 0 },
                { title: "Event", key: 1 },
                { title: "Event", key: 2 },
                { title: "Event", key: 3 },
            ]
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleAdd(e) {
        var newitem = {
            title: "Event",
            key: this.state.count,
        };
        this.setState((prevState) => ({ events: prevState.events.concat(newitem) }));
        this.setState(state => ({ count: state.count + 1 }));

        console.log(this.state.items);
        e.preventDefault();
    }
    handleDelete(e, key) {
        var uditems = this.state.events;
        console.log(uditems);
        console.log(uditems[key]);
        delete uditems[key];
        this.setState(state => ({ events: uditems }));
        console.log(key);
        e.preventDefault();
    }
    render() {
        //console.log(sideBarColor);
        return (
            <div style={sideBarStyle}>
                <Col lg={3} sm={3} md={3}>
                    <div
                        id="external-events"
                        style={{
                            padding: "10px",
                            width: "80%",
                            height: "auto",
                            maxHeight: "-webkit-fill-available"
                        }}
                    >
                        <p align="center">
                            <strong> Events</strong>
                        </p>
                        {this.state.events.map(title => (
                            <div
                                className="fc-event"
                                key={title.key}
                            >
                                {title.title}
                                <button style={{ backgroundimage: x, height: "3px", width: "3px" }} className="xpic" onClick={(e) => this.handleDelete(e, title.key)} />
                            </div>
                        ))}
                        <button align="center" onClick={this.handleAdd}>
                            {"+"}
                        </button>
                    </div>
                </Col>
            </div>
        )
    }
}

export default SideBar;