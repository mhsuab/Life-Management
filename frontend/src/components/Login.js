import React, { useContext, useState } from 'react'
import { Grid, Form, Button, Icon, Header } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { AuthContext } from '../context/auth'
import { useForm } from '../util/hooks'
import { LOGIN } from '../graphql'

const divStyle = {
    borderRadius: '25px',
    padding: '1.5rem',
    boxShadow: '8px 8px 15px #D9DDE6, -8px - 8px 15px #EFF5FE',
    background: "#E4E9F2",
};

const titleStyle = {
    justifyContent: 'center'
};

const LoginForm = (props) => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
      username: '',
      password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN, {
        update(
            _, result
            // {
            //     data: { login: userData }
            // }
        ) {
            console.log(result);
            context.login(result.data.login)
            //context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });
    
    function loginUserCallback() {
        loginUser();
    }

    return (
        <Grid textAlign='center' style={divStyle} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' style={titleStyle} icon>
                    <Icon name='user' />
                    <Header.Content>
                        login
                    </Header.Content>
                </Header>
                <Form icon onSubmit={onSubmit}>
                    <Form.Input 
                        icon='user' 
                        iconPosition='left' 
                        placeholder='Username' 
                        type='text'
                        name='username'
                        value={values.username}
                        error={errors.username? true :false}
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
                        error={errors.password? true: false}
                        onChange={onChange}
                    />
                    <Button color='teal' fluid type='submit' primary>
                        Login
                    </Button>
                </Form>
                {Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                        <ul className="list">
                            {Object.values(errors).map((value) => (
                                <li key={value}>{value}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </Grid.Column>
        </Grid>
    )
}

export default LoginForm;