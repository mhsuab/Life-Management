import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/Home';
import LoginForm from './components/Login';
import RegisterForm from './components/Register';
import MainPage from './components/Main';

import 'semantic-ui-css/semantic.min.css';
import './css/login.css';

const App = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <BrowserRouter>
                {/* <NavBar /> */}
                <Switch>
                    <Route exact path="/"><MainPage /></Route>
                    <Route exact path="/home"><HomePage /></Route>
                    <Route exact path="/login"><LoginForm /></Route>
                    <Route exact path="/register"><RegisterForm /></Route>
                    <Route exact path="/main"></Route>
                    {/* <Route exact path="/course"><Provider store={store}><CourseSelection /> </Provider></Route>*/}
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
