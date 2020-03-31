import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {},
    redirect: false
  };

  validate = () => {
    const errors = {};

    if (this.state.username.trim() === "") {
      errors.username = "Username is required";
    }
    if (this.state.password.trim() === "") {
      errors.password = "Password is required";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  addUser(e) {
    e.preventDefault();
    fetch("https://chitter-backend-api-v2.herokuapp.com/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        session: {
          handle: this.state.username,
          password: this.state.password
        }
      })
    })
      .then(response => response.json())
      .then(data => {
        sessionStorage.setItem("user_id", data.user_id);
        sessionStorage.setItem("session_key", data.session_key);
        console.log(sessionStorage.getItem("session_key"));
      })
      .catch(error => {
        console.error("Errorcito:", error);
      })
      .then(this.setRedirect());
  }

  handleLogin = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;
    this.addUser(e);
  };

  // Is used to store what the user is typing
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Sends a post request to create a new user

  setRedirect() {
    this.setState({ redirect: true });
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/peeps" />;
    }
  }

  render() {
    return (
      <Form style={{ margin: "50px 0" }} onSubmit={this.handleLogin.bind(this)}>
        {this.renderRedirect()}
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            onChange={this.onChange}
            value={this.state.username === null ? "" : this.state.username}
          />
        </FormGroup>

        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            onChange={this.onChange}
            value={this.state.password === null ? "" : this.state.password}
            errors={this.state.errors}
          />
        </FormGroup>

        <Button color="secondary" size="lg" block>
          Submit
        </Button>
      </Form>
    );
  }
}

export default Login;
