// JavaScript source code
import React, { Component } from 'react'
import { Button, Grid, Popup } from 'semantic-ui-react'

class Day extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const divStyle = {
            borderRadius: '50%',
            width: '1.6vw',
            height: '1.6vw',
            padding: "0vw",
            fontSize: "1px",
            textAlign: "center",
            justifyContent: "stretch",
            //boxShadow: '8px 8px 15px #D9DDE6, -8px - 8px 15px #EFF5FE',
            //background: "#E4E9F2",
        };

        return (
            <Popup wide trigger={<Button style={divStyle} >{this.props.content}</Button>} on='click'>
                <Grid divided columns='equal'>
                    <Grid.Column>
                        <Popup
                            trigger={<Button color='blue' content='Blue Pill' fluid />}
                            content='The story ends. You wake up in your bed and believe whatever you want to believe.'
                            position='top center'
                            size='tiny'
                            inverted
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Popup
                            trigger={<Button color='red' content='Red Pill' fluid />}
                            content='Stay in Wonderland, and I show you how deep the rabbit hole goes.'
                            position='top center'
                            size='tiny'
                            inverted
                        />
                    </Grid.Column>
                </Grid>
            </Popup>
        )
    }
}

export default Day
