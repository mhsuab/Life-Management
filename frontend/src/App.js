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

const mainStyle = {
  // padding: '20px',
  display: 'grid',
  background: '#555',
  width: '100vw',
  height: '100vh',
  // gridTemplateColumns: '90% 10%',
  gridTemplateRows:'7% 93%%',
  // gridGap: '10px'
}

const App = () => {
  return (
    <div style={mainStyle}>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/"><Main /></Route>
          <Route exact path="/home"><HomePage /></Route>
          <Route exact path="/login"><LoginForm /></Route>
          <Route exact path="/register"><RegisterForm /></Route>
          <Route exact path="/event"><Event /></Route>
          <Route exact path="/note"><Note /></Route>
          {/* <Route exact path="/main"><Main /></Route> */}
          {/* <Route path="/:unknown">
            {({ match }) => {
              return <strong>{`${match.params.unknown} Not Found!`}</strong>;
            }}
          </Route> */}
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
