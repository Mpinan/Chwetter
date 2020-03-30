import React, { Component } from "react";
import { Container } from "reactstrap";
import NavBar from "./components/navbar";
import Login from "./components/login";
import SignUp from "./components/signup";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Container className="App">
        <NavBar />
        <BrowserRouter>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </BrowserRouter>
      </Container>
    );
  }
}
export default App;
