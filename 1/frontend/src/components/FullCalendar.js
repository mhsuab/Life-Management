import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed

const CalendarStyle = {
    margin: "1vw",
    width: "20vw",
    height: "40vh",
    aspectRatio: "auto"
}

export default class Fcalendar extends React.Component {

    render() {
        return (
            <div style={CalendarStyle}>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    dateClick={this.handleDateClick}
                    editable={true}
                    headerToolbar={{
                        left: '',
                        center: '',
                        right: ''
                    }}
                    events={[
                        { title: 'event 1', date: '2021-01-18' },
                    ]}
                />
            </div> 
        )
    }
    handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
    }
}
