import React, { Component } from "react";
import { Container } from "reactstrap";
import NavBar from "./components/navbar";
import Login from "./components/login";
import SignUp from "./components/signup";
import { BrowserRouter, Route } from "react-router-dom";
import Peeps from "./components/peeps";
import Profile from "./components/profile";

class App extends Component {
  render() {
    return (
      <Container className="App">
        <NavBar />
        <BrowserRouter>
          <Route exact path="/peeps" component={Peeps} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          {/* <Redirect from="/" exact to="/peeps" /> */}
        </BrowserRouter>
      </Container>
    );
  }
}
export default App;
