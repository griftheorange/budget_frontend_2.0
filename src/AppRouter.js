import { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom'

import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';


export default function(){

    return (
        <Router>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/login' component={LoginPage}/>
                <Route path='/' component={HomePage}/>
            </Switch>
        </Router>
    )
}