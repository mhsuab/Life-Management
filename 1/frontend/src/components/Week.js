import { useState } from 'react'
import React from "react"
import OneDay from './OneDay'
import { Grid } from 'semantic-ui-react'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed

const WeekStyle = {
    margin: "1vw",
    width: "40vw",
    height: "40vh"
}

function Week() {
    return (
        <div style={WeekStyle}>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
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
