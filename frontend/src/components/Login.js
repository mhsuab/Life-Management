import React from 'react';
import { Grid, Form, Button, Message, Icon, Header, Segment } from 'semantic-ui-react';

const LoginForm = () => {
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' icon textAlign='center'>
                    <Icon name='user' />
                    <Header.Content>Log-in&ensp;to&ensp;Your&ensp;Account</Header.Content>
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='username' />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />

                        <Button color='teal' fluid size='large'>
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message attached='bottom'>
                    <Icon name='user plus' />
                    New to us? Please <a href='#'>register</a> first.<br />
                    <Icon name='paper plane outline' />
                    Support&ensp;us!!&ensp;Please&ensp;contact&ensp;<a href='#'>here</a>.
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default LoginForm;