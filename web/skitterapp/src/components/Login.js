import React, { Component } from 'react';

class Login extends Component {
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
        alert('A name was submitted: ' + this.state.username + " " + this.state.password);
        event.preventDefault();
    }

      render() {
        return (
                <div>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <label>
                            Username: 
                            <input type="text" 
                                   value={this.state.username} 
                                   onChange={this.handleChange.bind(this, 'username')} 
                            />
                        </label>
                        <br/>
                        <label>
                            Password: 
                            <input type="password" 
                                   value={this.state.password} 
                                   onChange={this.handleChange.bind(this, 'password')} 
                            />
                        </label>
                        <br/>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
        );
    }
}

export default Login;
