import React, { Component } from 'react';
import { Link } from 'react-router-dom'

let cssLoaded = false;
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', firstName: '', lastName: '' };
    }

    handleChange(propertyName, event) {
        let currentState = this.state;
        currentState[propertyName] = event.target.value;
        this.setState(currentState);
    }

    handleSubmit(event) {
        fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName
            })
        });
        event.preventDefault();
    }

      render() {
        if(cssLoaded === false) { cssLoaded = true; import ('./Register.css'); }
        return (
            <form className="form-register" onSubmit={this.handleSubmit.bind(this)}>
                <h1 className="mb-3 font-weight-bold color-purple">register</h1>
                <label htmlFor="inputEmail" className="sr-only">Email Address</label>
                <input type="email" id="email" name="email" className="form-control" placeholder="abc1234@rit.edu" value={this.state.email} onChange={this.handleChange.bind(this, 'email')} required autoFocus/>
                <label htmlFor="firstName" className="sr-only">First Name</label>
                <input type="text" id="firstName" name="firstName" className="form-control" placeholder="First Name" onChange={this.handleChange.bind(this, 'firstName')} required/>
                <label htmlFor="lastName" className="sr-only">First Name</label>
                <input type="text" id="lastName" name="lastName" className="form-control" placeholder="First Name" onChange={this.handleChange.bind(this, 'lastName')} required/>
                <button className="btn btn-lg btn-primary btn-block bg-purple" type="submit">Register</button>
                <hr />
                <p>Already have an account? <Link to="/login">Login now</Link></p>
            </form>
        );
    }
}

export default Login;