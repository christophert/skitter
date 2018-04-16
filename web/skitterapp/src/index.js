import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <Router>
        <div>
            <Header/>
            <div className="container-fluid">
                <Route exact path="/" component={App}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
            </div>
        </div>
    </Router>), document.getElementById('root'));
registerServiceWorker();
