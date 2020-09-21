import React, { Component } from "react";
import { Container } from "reactstrap";
import NavBar from "./components/navbar";
import Login from "./components/login";
import SignUp from "./components/signup";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Peeps from "./components/peeps";

class App extends Component {
  render() {
    return (
      <Container className="App">
        <NavBar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/peeps" component={Peeps} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Redirect exact path="/" exact to="/peeps" />
          </Switch>
        </BrowserRouter>
      </Container>
    );
  }
}
export default App;
