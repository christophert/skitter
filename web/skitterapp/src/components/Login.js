import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, CookiesProvider, Cookies } from 'react-cookie';

let cssLoaded = false;

class LoginAlert extends Component {
    constructor(props) {
        super(props);
    }
}

class Login extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state = { username: '',
            password: '',
            isAuthenticated: false,
            isLoading: false
        };
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
        //this.setState({isAuthenticated: false, hasAuthenticationFailed: false});
        this.isAuthenticated();
    }

    handleChange(propertyName, event) {
        let currentState = this.state;
        currentState[propertyName] = event.target.value;
        this.setState(currentState);
    }

    handleSubmit(event) {
        this.setState({isLoading: true, isAuthenticated: false});
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
            .then(response => {
                if(!response.ok) {
                    throw new Error("Response is not ok");
                }
            })
            .then(() => this.setState({isLoading: false, isAuthenticated: true}))
            .catch((error) => this.setState({error, isLoading: false, isAuthenticated: false}));
        event.preventDefault();
    }




      render() {
        if(cssLoaded === false) { cssLoaded = true; import ('./Login.css'); }

        let inalert = "";
        if (this.state.isAuthenticated) {
            inalert = <div className="alert alert-success">Login success</div>;
        } else {
            inalert = <div className="alert alert-danger">Not Logged in</div>;
        }

        return (
            <CookiesProvider>
            <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
                <h1 className="mb-3 font-weight-bold color-purple">login</h1>
                {inalert}
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
