import React, { useContext, useState } from 'react';
import { Grid, Form, Button, Icon, Header } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';
import { REGISTER } from '../graphql'

const divStyle = {
    borderRadius: '25px',
    padding: '1.5rem',
    boxShadow: '8px 8px 15px #D9DDE6, -8px - 8px 15px #EFF5FE',
    background: "#E4E9F2",
};

const titleStyle = {
    justifyContent: 'center'
};

const RegisterForm = (props) => {
    const context = useContext(AuthContext);

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        password: '',
        confirmPassword: '',
        todoExpiresDay: 10,
        calendarExpiresDay: 10,
        blockExpiresDay: 10,
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
        variables: values
    });
    
    function registerUser() {
        addUser();
    }

    return (
        <Grid textAlign='center' style={divStyle} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
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
                    <Button color='teal' type='submit' fluid>
                        Register
                    </Button>
                </Form>
            </Grid.Column>
        </Grid>
    )
}

export default RegisterForm;