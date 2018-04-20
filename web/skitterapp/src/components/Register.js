import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, CookiesProvider, Cookies } from 'react-cookie';

let cssLoaded = false;

class Register extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state = { email: '', firstName: '', lastName: '', username: '', password: '', isLoading: false, isRegistered: false, attemptedRegister: false };
    }

    isAuthenticated() {
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

    componentDidMount() {
        this.isAuthenticated();
    }

    handleChange(propertyName, event) {
        let currentState = this.state;
        currentState[propertyName] = event.target.value;
        this.setState(currentState);
    }

    handleSubmit(event) {
        const { cookies } = this.props;
        fetch('/auth/register', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': cookies.get('XSRF-TOKEN')
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password
            })
        })
            .then(response => {
                if(!response.ok) {
                    throw new Error("Error registering");
                }
            })
            .then(() => this.setState({isLoading: false, isRegistered: true, attemptedRegister: true}))
            .catch((error) => this.setState({error, isLoading: false, isRegistered: false, attemptedRegister: true}))
        event.preventDefault();
    }

      render() {
        if(cssLoaded === false) { cssLoaded = true; import ('./Register.css'); }
        return (
            <CookiesProvider>
            <form className="form-register" onSubmit={this.handleSubmit.bind(this)}>
                <h1 className="mb-3 font-weight-bold color-purple">register</h1>

                <label htmlFor="inputEmail" className="sr-only">Email Address</label>
                <input type="email" id="email" name="email" className="form-control" placeholder="Email Address" value={this.state.email} onChange={this.handleChange.bind(this, 'email')} required autoFocus/>

                <label htmlFor="inputUsername" className="sr-only">Username</label>
                <input type="username" id="username" name="username" className="form-control" placeholder="RIT Username" value={this.state.username} onChange={this.handleChange.bind(this, 'username')} required autoFocus/>

                <label htmlFor="firstName" className="sr-only">First Name</label>
                <input type="text" id="firstName" name="firstName" className="form-control" placeholder="First Name" onChange={this.handleChange.bind(this, 'firstName')} required/>

                <label htmlFor="lastName" className="sr-only">Last Name</label>
                <input type="text" id="lastName" name="lastName" className="form-control" placeholder="Last Name" onChange={this.handleChange.bind(this, 'lastName')} required/>

                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="password" name="password" className="form-control" value={this.state.password} onChange={this.handleChange.bind(this, 'password')} required autoFocus/>

                <button className="btn btn-lg btn-primary btn-block bg-purple" type="submit">Register</button>
                <hr />
                <p>Already have an account? <Link to="/login">Login now</Link></p>
            </form>
            </CookiesProvider>
        );
    }
}

export default withCookies(Register);
