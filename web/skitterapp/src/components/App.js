import React from 'react';
import { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
        <Fragment>
            <div className="row bg-purple align-items-center h-50">
                <div className="col-12 text-left"><h1 className="display-1 color-white">skitter</h1></div>
            </div>
            <div className="row align-items-center h-50">
                <div className="col-6 text-center"><Link to="/register" className="btn btn-primary btn-lg btn-block">Click here to register!</Link></div>
                <div className="col-6 text-right"><h3>See what's happening in the world yesterday, today, tomorrow, and Sunday!</h3></div>
            </div>
        </Fragment>
    );
  }
}

export default App;
