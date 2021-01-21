import React, { useEffect, useContext, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" // needed
import { useQuery } from '@apollo/react-hooks';
import { GET_MONTH_CALENDAR, UPDATE_CALENDAR } from '../graphql'
import { AuthContext } from '../context/auth';
import moment from "moment"


const Calendar = () => {
    const { user } = useContext(AuthContext);
    const [calendarData, setCalendarData] = useState([]);
    // const [activeDates, setActiveDates] = useState([]);
    const parseMonthData = (calendar_data) => {
        const target = moment(new Date(thisMonth)).format("YYYY/MM/DD");
        return [...Array(new Date(thisMonth.slice(0, 4), thisMonth.slice(-2), 0).getDate()).keys()].reduce((accumulator, day) => {
            if (calendar_data[day]) return [...accumulator, { title: '', date: moment(target).add(day, 'days').format("YYYY-MM-DD") }];
            else return accumulator
        }, [])
    }

    const thisMonth = moment(new Date).format("YYYY/MM");
    const { loading, data, refetch, subscribeToMore, error } = useQuery(GET_MONTH_CALENDAR, { variables: { month: thisMonth }, onCompleted: (data) => setCalendarData(data.getMonth) });
    if (error) console.log({ 'err': error })
    console.log(subscribeToMore)

    // useEffect(() => {
    //     console.log(subscribeToMore)
    //     console.log('qwertyuio')
    //     if (error) console.log({ 'err': error })
    //     subscribeToMore({
    //         document: UPDATE_CALENDAR,
    //         updateQuery: (prev, { subscriptionData }) => {
    //             console.log({ 'subscribe': subscriptionData, 'prev': prev, subscribeToMore, user })
    //             // const subscriptionData = l.subscriptionData;
    //             switch (subscriptionData.data.updateCalendar.type) {
    //                 case 'ADDED':
    //                 case 'DELETED':
    //                 case 'UPDATED':
    //                     const idx = new Date(subscriptionData.data.updateCalendar.info.Day).getDate() - 1;
    //                     console.log({'subsciption': idx});
    //                     setCalendarData([
    //                         ...calendarData.slice(0, idx - 1),
    //                         subscriptionData.data.updateCalendar.info.ifExist,
    //                         ...calendarData.slice(idx)
    //                     ])
    //                     return [
    //                         ...prev.slice(0, idx - 1),
    //                         subscriptionData.data.updateCalendar.info.ifExist,
    //                         ...prev.slice(idx)
    //                     ];
    //                 default:
    //                     return prev;
    //             }
    //         }
    //     })
    // })

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
                editable={true}
                headerToolbar={{
                    left: "",
                    center: "title",
                    right: ""
                }}
                events={(!loading) ? parseMonthData(data.getMonth) : []}
            />
            {/* { !loading ? parseMonthData(data.getMonth): []} */}
        </div>
    )
}

export default Calendar;