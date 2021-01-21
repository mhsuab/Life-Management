import React, { useContext } from 'react';
import { Grid, Form, Button, Icon, Header, Label, Divider } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';
import { REGISTER } from '../graphql'
import { mainBackground } from './../config';
import { Link } from "react-router-dom";

const divStyle = {
    backgroundColor: mainBackground,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
};

const titleStyle = {
    justifyContent: 'center'
};

const columnStyle = {
    width: 350,
    height: 550,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: mainBackground
}

const RegisterForm = (props) => {
    const context = useContext(AuthContext);

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        password: '',
        confirmPassword: '',
        todoExpiresDay: '',
        calendarExpiresDay: '',
        blockExpiresDay: '',
        notificationTime: 23
    });

    const [addUser, { loading }] = useMutation(REGISTER, {
        update(
            _,
            {
                data: { register: userData }
            }
        ) {
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            alert(err)
        },
        variables: {
            ...values,
            todoExpiresDay: parseInt(values.todoExpiresDay),
            calendarExpiresDay: parseInt(values.calendarExpiresDay),
            blockExpiresDay: parseInt(values.blockExpiresDay)
        }
    });

    function registerUser() {
        addUser();
    }

    return (
        <div style={divStyle}>
            <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Column style={columnStyle}>
                    <Header as='h2' style={titleStyle} icon>
                        <Icon name='user plus' />
                        <Header.Content>
                            Register
                    </Header.Content>
                    </Header>
                    <Form onSubmit={onSubmit}>
                        <Form.Input
                            icon='user'
                            iconPosition='left'
                            placeholder='Username'
                            name='username'
                            type='text'
                            value={values.username}
                            onChange={onChange}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            name='password'
                            type='password'
                            value={values.password}
                            onChange={onChange}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Confirm Password'
                            name='confirmPassword'
                            type='password'
                            value={values.confirmPassword}
                            onChange={onChange}
                        />
                        <Label.Group width='equal'>
                            <Label width={2}> todo expire </Label>
                            <Label width={2}> calendar expire </Label>
                            <Label width={2}> event expire </Label>
                        </Label.Group>
                        <Form.Group widths='equal'>
                            <Form.Input
                                placeholder='days'
                                name='todoExpiresDay'
                                type='text'
                                value={values.todoExpiresDay}
                                onChange={onChange}
                                width={2}
                            />
                            <Form.Input
                                placeholder='days'
                                name='calendarExpiresDay'
                                type='text'
                                value={values.calendarExpiresDay}
                                onChange={onChange}
                                width={2}
                            />
                            <Form.Input
                                placeholder='days'
                                name='blockExpiresDay'
                                type='text'
                                value={values.blockExpiresDay}
                                onChange={onChange}
                                width={2}
                            />
                        </Form.Group>
                        <Button color='teal' type='submit' fluid>
                            Register
                    </Button>
                    </Form>
                    <Divider />
                    <div>
                        <Label style={{ fontSize: '15px' }}>
                            User Existed?
                        </Label>
                        <Icon name='hand point right' size='large' />
                        <Label style={{ fontSize: '10px' }} />
                        <Button
                            icon
                            labelPosition='left'
                            as={Link}
                            to='/login'
                            primary
                            size='tiny'
                        >
                            <Icon name='user' />
                            LOGIN
                        </Button>
                    </div>
                    <div>
                        <Label style={{ fontSize: '15px' }}>
                            Back to Home
                        </Label>
                        <Icon name='hand point right' size='large' />
                        <Label style={{ fontSize: '10px' }} />
                        <Button
                            icon
                            labelPosition='left'
                            as={Link}
                            to='/home'
                            size='tiny'
                            secondary
                        >
                            <Icon name='home' />
                            HOME
                        </Button>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default RegisterForm;