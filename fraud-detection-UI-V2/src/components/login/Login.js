import React, { Component } from "react";
import { Form, Label, Input } from "reactstrap";
import "./Login.css";
import logo1 from "./login1.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUsername: "",
      inputPassword: "",
      errorMessage: false,
    };
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleUsernameInput(event) {
    this.setState({ inputUsername: event.target.value });
  }

  handlePasswordInput(event) {
    this.setState({ inputPassword: event.target.value });
  }

  handleLogin(event) {
    event.preventDefault();
    const error = this.props.handleLogin(
      this.state.inputUsername,
      this.state.inputPassword
    );
    this.setState({ errorMessage: error });
  }

  render() {
    return (
      <div className="login-component">
        <div className="logo-container">
          <img src={logo1} className="logo" alt="logo"></img>
        </div>
        <div className="login-form-container">
          <div className="error-message" hidden={!this.state.errorMessage}>
            <i className="fa fa-times" aria-hidden="true"></i>
            Sorry, the username or password you have entered is incorrect.
          </div>
          <Form className="login-form">
            <div className="heading-2">Please sign in</div>

            <Label className="label">
              <i className="fa fa-user" aria-hidden="true"></i>Username
            </Label>

            <Input
              type="text"
              value={this.state.inputUsername}
              onChange={this.handleUsernameInput}
              autoComplete="username"
            />

            <Label className="label">
              <i className="fa fa-lock"></i>Password
            </Label>
            <Input
              type="password"
              value={this.state.inputPassword}
              onChange={this.handlePasswordInput}
              autoComplete={"current-password"}
            />

            <Input
              className="sign-in-btn primary-theme-button"
              type="submit"
              onClick={this.handleLogin}
              value="Sign In"
            ></Input>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
