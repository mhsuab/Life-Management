import React, { Component }  from 'react';
import Day from './Day';
import { Grid, Button } from 'semantic-ui-react'


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

        return(
            <div style={CalendarStyle}>
                <Grid divided columns='equal' style={CalendarStyle}>
                    <Grid.Column>
                        <Grid.Row>
                            <Day content='Sun' />
                            <Day content='Mon'/>
                            <Day content='Tue'/>
                            <Day content='Wed'/>
                            <Day content='Thur'/>
                            <Day content='Fri'/>
                            <Day content='Sat'/>
                        </Grid.Row>
                        <Grid.Row>
                            <Day content='1'/>
                            <Day content='2'/>
                            <Day content='3'/>
                            <Day content='4'/>
                            <Day content='5'/>
                            <Day content='6'/>
                            <Day content='7'/>
                        </Grid.Row>
                        <Grid.Row>
                            <Day />
                            <Day />
                            <Day />
                            <Day />
                            <Day />
                            <Day />
                            <Day />
                        </Grid.Row>
                        <Grid.Row>
                            <Day />
                            <Day />
                            <Day />
                            <Day />
                            <Day />
                            <Day />
                            <Day />
                        </Grid.Row>
                        <Grid.Row>
                            <Day />
                            <Day />
                            <Day />
                            <Day />
                            <Day />
                            <Day />
                            <Day />
                        </Grid.Row>
                        <Grid.Row>
                            <Day />
                            <Day />
                            <Day />
                            <Day />
                            <Day />
                            <Day />
                            <Day />
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}


export default Calendar