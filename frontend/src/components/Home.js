import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon } from "semantic-ui-react";
import { serviceTitle, mainBackground } from "./../config";

const divStyle = {
    backgroundColor: mainBackground,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
};

const HomePage = () => {
    return (
        <div style={divStyle}>
            <Header as='h1' icon textAlign='center' verticalAlign='middle'>
                {serviceTitle}
            </Header>
            <div>
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
                    icon
                    labelPosition='right'
                    as={Link}
                    to='/register'
                    color='teal'
                >
                    Register
                    <Icon name='user plus' />
                </Button>
            </div>
        </div>
    )
}

export default HomePage;