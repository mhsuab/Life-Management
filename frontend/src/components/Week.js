import React from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
//import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed

const WeekStyle = {
    background: "#FFFFFF",
    borderRadius: '3px',
    padding: '3px',
    border: '1px solid rgba(34, 36, 38, 0.15)'
}

function Week() {
    return (
        <div style={WeekStyle}>
            <FullCalendar
                height= "100%"
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridWeek"
                headerToolbar={false}
                events={[
                    { title: 'event 1', start: '2021-01-18T09:00:00', end: '2021-01-18T11:00:00' },
                    { title: 'event 2', start: '2021-01-18T08:00:00', end: '2021-01-18T11:00:00' }
                ]}
            />
        </div>
       
    )
}
export default Week
