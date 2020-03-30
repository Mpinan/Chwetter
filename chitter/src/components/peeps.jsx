import React, { Component } from "react";
import {
  Table,
  Button,
  UncontrolledCollapse,
  CardBody,
  Card
} from "reactstrap";

class Peeps extends Component {
  state = {
    peeps: []
  };

  componentDidMount() {
    this.getPeeps();
  }

  getPeeps() {
    fetch("https://chitter-backend-api-v2.herokuapp.com/peeps")
      .then(response => {
        return response.json();
      })
      .then(result => this.setState({ peeps: result }))
      .then(result => console.log(this.state.peeps, "peeps"))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Table striped responsive hover>
        <thead>
          <tr>
            <th>Peep</th>
          </tr>
        </thead>
        <tbody>
          {this.state.peeps.map(peep => {
            return (
              <tr key={peep.id}>
                <td>{peep.body}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
export default Peeps;
