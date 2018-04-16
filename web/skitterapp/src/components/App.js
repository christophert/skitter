import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import './App.css';

class App extends Component {
  render() {
    return (
        <Header />
    );
  }
}

export default App;
