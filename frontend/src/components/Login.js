import React, { useContext, useState } from 'react'
import { Grid, Form, Button, Icon, Header, Divider, Label } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { AuthContext } from '../context/auth'
import { useForm } from '../util/hooks'
import { LOGIN } from '../graphql'
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: mainBackground,
}

const LoginForm = (props) => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    });

    const [loginUser] = useMutation(LOGIN, {
        update(
            _,
            {
                data: { login: userData }
            }
        ) {
            context.login(userData)
            props.history.push('/');
        },
        onError(err) {
            alert(err)
        },
        variables: values
    });

    function loginUserCallback() {
        loginUser();
    }

    return (
        <div style={divStyle} >
            <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Column style={columnStyle} >
                    <Header as='h2' style={titleStyle} icon>
                        <Icon name='user' />
                        <Header.Content>
                            login
                        </Header.Content>
                    </Header>
                    <Form onSubmit={onSubmit}>
                        <Form.Input
                            icon='user'
                            iconPosition='left'
                            placeholder='Username'
                            type='text'
                            name='username'
                            value={values.username}
                            error={errors.username ? true : false}
                            onChange={onChange}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name='password'
                            value={values.password}
                            error={errors.password ? true : false}
                            onChange={onChange}
                        />
                        <Button color='teal' fluid type='submit' primary>
                            Login
                        </Button>
                    </Form>
                    <Divider />
                    <div>
                        <Label style={{ fontSize: '15px' }}>
                            Not Register?
                        </Label>
                        <Icon name='hand point right' size='large' />
                        <Label style={{ fontSize: '10px' }} />
                        <Button
                            icon
                            labelPosition='left'
                            as={Link}
                            to='/register'
                            color='teal'
                            size='tiny'
                        >
                            <Icon name='user plus' />
                            REGISTER
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

export default LoginForm;