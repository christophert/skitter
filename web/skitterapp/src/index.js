import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import App from './components/App';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Profile from './components/Profile';
import PrivateRoute from './PrivateRoute';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <Router>
        <CookiesProvider>
            <Header/>
            <div className="container-fluid h-100">
                <Route exact path="/" component={App}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                <PrivateRoute exact path="/settings" component={Settings}/>
                <PrivateRoute exact path="/profile" component={Profile}/>
                <PrivateRoute path='/profile/:uid' component={Profile}/>
            </div>
        </CookiesProvider>
    </Router>), document.getElementById('root'));
registerServiceWorker();
