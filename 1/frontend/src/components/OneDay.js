import React, { Component }  from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

class OneDay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //const currentDate = '2018-11-01';
        /*
        const schedulerData = [
            { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
            { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
        ];*/
        const PaperStyle = {
            width: "14vw",
            height: "60vh",
        }

        return (
            <Paper style={PaperStyle}>
                <Scheduler
                    data={this.props.schedulerData}
                >
                    <ViewState
                        currentDate={this.props.currentDate}
                    />
                    <DayView
                        startDayHour={8}
                        endDayHour={24}
                    />
                    <Appointments />
                </Scheduler>
            </Paper>
        )
    }
}

export default OneDay
