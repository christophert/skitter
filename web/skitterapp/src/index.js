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
import registerServiceWorker from './registerServiceWorker';

const authState = {
    isAuthenticated: false,
    authenticate(cb) {
        fetch('/auth/isAuthenticated', {
            method: 'GET',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
            }
        })
        .then((response) => {
            if(response.ok) {
                this.setState({isAuthenticated: true});
                return response.json();
            } else {
                throw new Error("is not authenticated");
            }
        })
        .catch((error) => this.setState({isAuthenticated: false}));
    }
}

ReactDOM.render((
    <Router>
        <CookiesProvider>
            <Header/>
            <div className="container-fluid h-100">
                <Route exact path="/" component={App}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/settings" component={Settings}/>
                <Route exact path="/profile" component={Profile}/>
                <Route path='/profile/:uid' component={Profile}/>
            </div>
        </CookiesProvider>
    </Router>), document.getElementById('root'));
registerServiceWorker();
