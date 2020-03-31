import React, { Component } from "react";

class Profile extends Component {
  state = {};

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
        console.log("Success:", data);
      })
      .catch(error => {
        console.error("Error:", error);
      })
      .then(this.setRedirect());
  }
  render() {
    return <div></div>;
  }
}

export default Profile;
