import React, { Component } from "react";
import { Form, FormGroup, Label, Col, Input, Button, Alert } from "reactstrap";
import Header from "../Header";
import Footer from "../Footer";
import "./Login.css";
import { UncontrolledCarousel } from "reactstrap";
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

  handleLogin() {
    const error = this.props.handleLogin(
      this.state.inputUsername,
      this.state.inputPassword
    );
    console.log(error);
    this.setState({ errorMessage: error });
  }

  render() {
    const items = [
      {
        src:
          "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
        altText: "Slide 1",
        caption: "Slide 1",
        header: "Slide 1 Header",
        key: "1",
      },
      {
        src:
          "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
        altText: "Slide 2",
        caption: "Slide 2",
        header: "Slide 2 Header",
        key: "2",
      },
      {
        src:
          "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
        altText: "Slide 3",
        caption: "Slide 3",
        header: "Slide 3 Header",
        key: "3",
      },
    ];
    return (
      <div
        style={{
          width: 100 + "vw",
          height: 100 + "vh",
          background: "white",
        }}
      >
        <Header />
        <div style={{ float: "left" }}>
          <img src={logo1} className="logo" alt="logo"></img>
        </div>
        <div
          style={{
            textAlign: "center",
            width: 35 + "%",
            background: "white",
            borderRadius: 30 + "px",
            float: "right",
            marginTop: 15 + "vh",
            marginRight: 15 + "vh",
          }}
        >
          <h2 style={{ marginLeft: 30, marginBottom: 30 }}>Please sign in</h2>
          <p textAlign="center">
            <Alert
              hidden={!this.state.errorMessage}
              style={{ width: 80 + "%", marginLeft: 30 + "px" }}
              color="danger"
            >
              Sorry, the username or password you have entered is incorrect.
            </Alert>
          </p>
          <Form style={{ marginLeft: 30 }}>
            <FormGroup row>
              <Label sm={3}>Username :</Label>
              <Col sm={6}>
                <Input
                  type="text"
                  value={this.state.inputUsername}
                  onChange={this.handleUsernameInput}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>Password :</Label>
              <Col sm={6}>
                <Input
                  type="password"
                  value={this.state.inputPassword}
                  onChange={this.handlePasswordInput}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col sm={5}></Col>
              <Col sm={3}>
                <Button
                  style={{ marginBottom: 5 + "vh", marginTop: 5 + "vh" }}
                  color="primary"
                  onClick={this.handleLogin}
                >
                  Sign in
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
