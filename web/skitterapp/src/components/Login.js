import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
            <div>
    <form class="form-signin">
        <h1 class="h3 mb-3 font-weight-bold">login</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="text" id="username" class="form-control" placeholder="Username" required autofocus> </input>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="password" class="form-control" placeholder="Password" required> </input>
        <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me </input>
        </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block bg-purple" type="submit">Log in</button>
        <hr />
        <p>New to skittr? <a href="/register">Sign up now</a></p>
    </form>
    </div>
    );
  }
}

export default Login;
