import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" // needed
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_CALENDAR, UPDATE_CALENDAR } from '../graphql'
import { AuthContext } from '../context/auth';


const Calendar = () => {
    // const { user } = useContext(AuthContext)
    // const {
    //     refetch,
    //     loading,
    //     error, 
    //     data, 
    //     subscribeToMore 
    // } = useQuery(GET_CALENDAR);

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