import React, { Component } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";

class PostPeep extends Component {
  state = { chweet: "" };

  addPeep(e) {
    e.preventDefault();
    fetch("https://chitter-backend-api-v2.herokuapp.com/peeps", {
      method: "POST",
      headers: {
        Authorization: sessionStorage.getItem("session_key"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        session: {
          user_id: this.state.user,
          body: this.state.password
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

  handlePeep(e) {
    console.log(this.state.chweet, "----");
    e.preventDefault();
    this.addPeep();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <FormGroup onChweet={this.handlePeep.bind(this)}>
        <Label for="exampleText">Text Area</Label>
        <Input
          onChange={this.onChange}
          type="textarea"
          name="chweet"
          id="chweet"
        />
        <Button>Chweet</Button>
      </FormGroup>
    );
  }
}

export default PostPeep;
