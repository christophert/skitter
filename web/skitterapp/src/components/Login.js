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
        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                '_csrf': cookies.get('XSRF-TOKEN')
            })
        });
        event.preventDefault();
    }

      render() {
        if(cssLoaded === false) { cssLoaded = true; import ('./Login.css'); }
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
