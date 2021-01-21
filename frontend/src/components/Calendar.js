import React, { useEffect, useContext, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" // needed
import { useQuery } from '@apollo/react-hooks';
import { GET_MONTH_CALENDAR, UPDATE_CALENDAR } from '../graphql'
import { AuthContext } from '../context/auth';
import moment from "moment"


const Calendar = () => {
    // const { user } = useContext(AuthContext)
    // const [ activeDates, setActiveDates ] = useState([false])
    // const thisMonth = moment(new Date).format("YYYY/MM");
    // console.log(thisMonth) 

    // const { loading, data, subscribeToMore, refetch } = useQuery(GET_MONTH_CALENDAR, {
    //     variables: { month: thisMonth }
    // })

    // useEffect(() => {
    //     subscribeToMore({
    //         document: UPDATE_CALENDAR,
    //         updateQuery: (prev, { subscriptionData }) => {
    //             console.log(subscriptionData)
    //             if(!subscriptionData.data || !user) return prev
    //             const newMsg = subscriptionData.data.updateCalendar
    //             console.log(newMsg)
    //             // if(subscriptionData.data.message.mutation === "CREATED"){
    //             //     if((newMsg.sender === sender && newMsg.receiver === receiver) || (newMsg.receiver === sender && newMsg.sender === receiver)) {
    //             //         setStatus({ type: 'success', msg: 'Message Sent'})
    //             //         return { ...prev, messages: [...prev.messages, ...subscriptionData.data.message.messages] }
    //             //     }
    //             // }
    //             // else if(subscriptionData.data.message.mutation === "DELETED") {
    //             //     if((newMsg.sender === sender) || (newMsg.sender === receiver)) {
    //             //         setStatus({ type: 'info', msg: 'Message cache cleared'})
    //             //         return { ...prev, messages:[] }
    //             //     }
    //             // }
    //             return prev
    //         }
    //     })
    // }, [subscribeToMore, user])

    // useEffect(async () => {
    //     const act = await refetch()
    //     console.log(act.data.getMonth)
    //     setActiveDates[act.data.getMonth]
    // }, [user])

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
                events={[
                    { title: '', date: '2021-01-18' },
                    { title: '', date: '2021-01-21' },
                ]}
            />
        </div>
    )
}


export default Calendar

// import React, { Component } from 'react'
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import interactionPlugin from "@fullcalendar/interaction" // needed


// class Calendar extends Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         const CalendarStyle = {
//             margin: "0vw",
//             background: "#FFFFFF",
//             textAlign: "left",
//             borderRadius: '3px',
//             padding: '3px',
//             border: '1px solid rgba(34, 36, 38, 0.15)'
//         };

//         return (
//             <div style={CalendarStyle} className="Calendar">
//                 <FullCalendar
//                     height="100%"
//                     aspectRatio="1"
//                     plugins={[dayGridPlugin, interactionPlugin]}
//                     initialView="dayGridMonth"
//                     dateClick={this.handleDateClick}
//                     editable={true}
//                     headerToolbar={{
//                         left: "",
//                         center: "title",
//                         right: ""
//                     }}
//                     events={[
//                         { title: '', date: '2021-01-18' },
//                         { title: '', date: '2021-01-21' },
//                     ]}
//                 />
//             </div>
//         )
//     }
// }


// export default Calendar