import 'semantic-ui-css/semantic.min.css'
import './CSS/App.css'

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom'

import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import ErrorPage from './Pages/ErrorPage';
import TablePage from './Pages/TablePage';

export default function(){

    return (
        <Router>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/login' component={LoginPage}/>
                <Route path='/error' component={ErrorPage}/>
                <Route path='/table/:tableName' component={TablePage}/>
                <Route path='/' component={HomePage}/>
            </Switch>
        </Router>
    )
}