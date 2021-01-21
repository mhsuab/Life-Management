import React, { useEffect, useContext, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" // needed
import { useQuery } from '@apollo/react-hooks';
import { GET_MONTH_CALENDAR, UPDATE_CALENDAR } from '../graphql'
import { AuthContext } from '../context/auth';
import moment from "moment"


const Calendar = () => {
    const { user } = useContext(AuthContext)
    const [ events, setEvents ] = useState([])
    const thisMonth = moment(new Date).format("YYYY/MM")
    console.log(thisMonth) 

    const { loading, data, subscribeToMore, refetch } = useQuery(GET_MONTH_CALENDAR, {
        variables: { month: thisMonth }
    })

    useEffect(async () => {
        const act = await refetch()
        console.log(act.data.getMonth)
        seetEvents(parseMonthData(act.data.getMonth))
    }, [user])

    const parseMonthData = (calendar_data) => {
        const target = moment(new Date(thisMonth)).format("YYYY/MM/DD");
        return [...Array(new Date(thisMonth.slice(0, 4), thisMonth.slice(-2), 0).getDate()).keys()].reduce((accumulator, day) => {
            if (calendar_data[day]) return [...accumulator, { title: '', date: moment(target).add(day, 'days').format("YYYY-MM-DD") }];
            else return accumulator
        }, [])
    }

    const CalendarStyle = {
        margin: "0vw",
        background: "#FFFFFF",
        textAlign: "left",
        borderRadius: '3px',
        padding: '3px',
        border: '1px solid rgba(34, 36, 38, 0.15)'
    };

    return (
        <div style={CalendarStyle} className="Calendar">
            <FullCalendar
                height="100%"
                aspectRatio="1"
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                // dateClick={handleDateClick}
                editable={true}
                headerToolbar={{
                    left: "",
                    center: "title",
                    right: ""
                }}
                events={events}
            />
        </div>
    )
}

export default Calendar