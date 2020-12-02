import React from "react";
import { Grid, Button, Header, Icon } from "semantic-ui-react";
import { serviceTitle } from "./../config";

const HomePage = () => {
    return (
        <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
            <Grid.Column >
            <Header
                as='h1'
                content={ serviceTitle }
                style={{
                    fontSize: '4em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: '3em',
                }}
                textAlign="center"
                color="black"
            />
            <Header as='h2' />
            <div align="center">
                <Button
                    primary
                    icon
                    labelPosition='right'
                >
                    &ensp;Login&ensp;&ensp;
                    <Icon name='user' />
                </Button>
                <Button
                    secondary
                    icon
                    labelPosition='right'
                >
                    Register
                    <Icon name='user plus' />
                </Button>
            </div>
            </Grid.Column>
        </Grid>
    )
}

export default HomePage;