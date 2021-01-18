import React from 'react';
import { Grid, Form, Button, Message, Icon, Header, Segment } from 'semantic-ui-react';

const divStyle = {
    borderRadius: '25px',
    padding: '1.5rem',
    boxShadow: '8px 8px 15px #D9DDE6, -8px - 8px 15px #EFF5FE',
    background: "#E4E9F2",
};

const titleStyle = {
    justifyContent: 'center'
};

const RegisterForm = () => {
    return (
        <Grid textAlign='center' style={divStyle} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' style={titleStyle} icon>
                    <Icon name='user plus' />
                    <Header.Content>
                        Register
                    </Header.Content>
                </Header>
                <Form icon>
                    <Form.Input icon='user' iconPosition='left' placeholder='username' />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                    />
                    <Button color='teal' fluid>
                        Register
                    </Button>
                </Form>
            </Grid.Column>
        </Grid>
    )
}

export default RegisterForm;