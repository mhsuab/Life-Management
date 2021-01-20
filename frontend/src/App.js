import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/Home';
import LoginForm from './components/Login';
import RegisterForm from './components/Register';
import Event from './components/Event';
import Note from './components/Note';
import Main from './components/Main';
import NavBar from './components/NavBar';
import './css/login.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';
import UnAuthRoute from './util/UnAuthRoute';
import { navBarColor } from './config';
require('dotenv-defaults').config();

const mainStyle = {
    display: 'grid',
    background: { navBarColor },
    width: '100vw',
    height: '100vh',
    gridTemplateRows: '7% 93%',
}

const App = () => {
    // console.log({ 'uri': window.location.hostname, 'b': process.env.BACKEND_IP, 'e': backend})
    return (
        <AuthProvider>
            <div style={mainStyle}>
                <BrowserRouter>
                    <NavBar />
                    <Switch>
                        <UnAuthRoute exact path="/" component={Main} />
                        <AuthRoute exact path="/home" component={HomePage} />
                        <AuthRoute exact path="/login" component={LoginForm} />
                        <AuthRoute exact path="/register" component={RegisterForm} />
                    </Switch>
                </BrowserRouter>
            </div>
        </AuthProvider>
    )
}

export default App;
