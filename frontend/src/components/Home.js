import React from "react";
import { Link } from "react-router-dom";
import { Grid, Button, Header, Icon, Segment } from "semantic-ui-react";
import { serviceTitle } from "./../config";

const divStyle = {
    borderRadius: '25px',
    padding: '1.5rem',
    boxShadow: '8px 8px 15px #D9DDE6, -8px - 8px 15px #EFF5FE',
    background: "#E4E9F2",
};

const HomePage = () => {
    return (
        <Grid textAlign='center' style={divStyle} verticalAlign='middle'>
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
            <Segment.Inline>
                <Button
                    primary
                    icon
                    labelPosition='right'
                    as={Link}
                    to='/login'
                >
                    &ensp;Login&ensp;&ensp;
                    <Icon name='user' />
                </Button>
                <Button
                    secondary
                    icon
                    labelPosition='right'
                    as={Link}
                    to='/register'
                >
                    Register
                    <Icon name='user plus' />
                </Button>
            </Segment.Inline>
            </Grid.Column>
        </Grid>
    )
}

export default HomePage;