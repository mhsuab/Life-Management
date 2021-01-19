import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/Home';
import LoginForm from './components/Login';
import RegisterForm from './components/Register';
import Event from './components/Event';
import Note from './components/Note';
import Main from './components/Main';
import NavBar from './components/NavBar';
import CalTest from './components/CalTest';
import Week from './components/Week';
import './css/login.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';
import UnAuthRoute from './util/UnAuthRoute';

const mainStyle = {
    // padding: '20px',
    display: 'grid',
    background: '#555',
    width: '100vw',
    height: '100vh',
    // gridTemplateColumns: '90% 10%',
    gridTemplateRows: '7% 93%%',
    // gridGap: '10px'
}

const App = () => {
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
                        {/* <Route exact path="/"><Main /></Route>
                        <Route exact path="/home"><HomePage /></Route>
                        <Route exact path="/login"><LoginForm /></Route>
                        <Route exact path="/register"><RegisterForm /></Route>
                        <Route exact path="/event"><Event /></Route>
                        <Route exact path="/note"><Note /></Route>
                        <Route exact path="/test"><CalTest /></Route>
                        <Route exact path="/week"><Week /></Route> */}
                        {/* <Route exact path="/main"><Main /></Route> */}
                        {/* <Route path="/:unknown">
                {({ match }) => {
                return <strong>{`${match.params.unknown} Not Found!`}</strong>;
                }}
            </Route> */}
                    </Switch>
                </BrowserRouter>
            </div>
        </AuthProvider>
    )
}

export default App;
