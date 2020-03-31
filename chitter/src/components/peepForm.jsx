import React, { Component } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";

class PostPeep extends Component {
  state = {
    userId: sessionStorage.getItem("user_id"),
    chweet: "",
    redirect: false
  };

  addPeep() {
    fetch("https://chitter-backend-api-v2.herokuapp.com/peeps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token token=" + sessionStorage.getItem("session_key")
      },
      body: JSON.stringify({
        peep: {
          user_id: this.state.userId,
          body: this.state.chweet
        }
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
      })
      .catch(error => {
        console.error("Errorcito:", error);
      })
      .catch(err => console.log(err));
  }

  setRedirect() {
    this.setState({ redirect: true });
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/peeps" />;
    }
  }

  handlePeep(e) {
    console.log("----");
    e.preventDefault();
    this.addPeep();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  render() {
    return (
      <FormGroup>
        {this.renderRedirect()}
        <Label for="exampleText">Text Area</Label>
        <Input
          onChange={this.onChange}
          type="textarea"
          name="chweet"
          id="chweet"
        />
        <Button onClick={this.handlePeep.bind(this)}>Submit</Button>
      </FormGroup>
    );
  }
}

export default PostPeep;
