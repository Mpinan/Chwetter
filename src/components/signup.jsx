import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Badge } from "reactstrap";
import { Redirect } from "react-router-dom";
const helpers = require("./helpers");

// const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class SignUp extends Component {
  state = {
    uid: 0,
    username: "",
    password: "",
    errors: {},
    redirect: false
  };

  addUser() {
    fetch("https://chitter-backend-api-v2.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          handle: this.state.username,
          password: this.state.password
        }
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.handle);
        helpers.saveSession(data);
        console.log("Success:", data);
      })
      .catch(error => {
        console.error("Errorcito:", error);
      })
      .then(this.setRedirect());
  }

  handleSingUp() {
    const errors = helpers.validate(this.state);
    this.setState({ errors });
    if (errors) return;
    this.addUser();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
      <Form
        style={{ margin: "50px 0" }}
        onSubmit={this.handleSingUp.bind(this)}
      >
        {this.renderRedirect()}
        <div>
          <h1>
            <Badge color="secondary">Sign up</Badge>
          </h1>
        </div>
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

export default SignUp;
