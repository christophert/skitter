import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, CookiesProvider, Cookies } from 'react-cookie';

let cssLoaded = false;
class Login extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
    }

    handleChange(propertyName, event) {
        let currentState = this.state;
        currentState[propertyName] = event.target.value;
        this.setState(currentState);
    }

    handleSubmit(event) {
        const { cookies } = this.props;
        let data = new URLSearchParams();
        data.append("username", this.state.username);
        data.append("password", this.state.password);

        fetch('/auth/login', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'X-XSRF-TOKEN': cookies.get('XSRF-TOKEN')
            },
            body: data
        })
            .then(function(response) {
                console.log(response.json());
            });
        event.preventDefault();
    }

    initCSRF() {
        fetch('/auth/isAuthenticated', {
            method: 'GET',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(function(response) {
                console.log(response.json());
            });
    }


      render() {
        if(cssLoaded === false) { cssLoaded = true; import ('./Login.css'); this.initCSRF(); }
        return (
            <CookiesProvider>
            <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
                <h1 className="mb-3 font-weight-bold color-purple">login</h1>
                <label htmlFor="inputUser" className="sr-only">Username</label>
                <input type="text" id="username" name="username" className="form-control" placeholder="Username" value={this.state.username} onChange={this.handleChange.bind(this, 'username')} required autoFocus/>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="password" name="password" className="form-control" placeholder="Password" onChange={this.handleChange.bind(this, 'password')} required/>
                <button className="btn btn-lg btn-primary btn-block bg-purple" type="submit">Log in</button>
                <hr />
                <p>New to skittr? <a href="/register">Sign up now</a></p>
            </form>
            </CookiesProvider>
        );
    }
}

export default withCookies(Login);
