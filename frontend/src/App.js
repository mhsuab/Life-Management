import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './components/Home';
import LoginForm from './components/Login';
import RegisterForm from './components/Register';
import Main from './components/Main';
import NavBar from './components/NavBar';

import './css/login.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

const appStyle = {
  display: 'grid',
  background: '#555',
  width: '100vw',
  height: '100vh',
  gridTemplateRows:'7% 93%%',
}

const App = () => {
  return (
    <AuthProvider style={appStyle}>
      <BrowserRouter>
        <NavBar />
        <Route exact path="/" component={Main} />
        <AuthRoute exact path="/home" component={HomePage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/register" component={RegisterForm} />
        {/* <Route exact path="/main"><Main /></Route> */}
        {/* <Route path="/:unknown">
          {({ match }) => {
            return <strong>{`${match.params.unknown} Not Found!`}</strong>;
          }}
        </Route> */}
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
