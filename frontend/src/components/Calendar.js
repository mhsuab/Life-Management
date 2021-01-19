import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" // needed


class Calendar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const CalendarStyle = {
            margin: "0vw",
            background: "#FFFFFF",
            textAlign: "left"
        };

        return (
            <div style={CalendarStyle} className="Calendar">
                <FullCalendar
                    height="100%"
                    aspectRatio="1"
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    dateClick={this.handleDateClick}
                    editable={true}
                    headerToolbar={{
                        left: "",
                        center: "title",
                        right: ""
                    }}
                    events={[
                        { title: '', date: '2021-01-18' },
                        { title: '', date: '2021-01-19' },
                    ]}
                />
            </div>
        )
    }
}


export default Calendar