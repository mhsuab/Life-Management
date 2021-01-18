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
        const PaperStyle = {
            width: "100%",
            height: "50%",
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
