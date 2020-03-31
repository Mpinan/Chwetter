import React, { Component } from "react";
import { Table } from "reactstrap";
import PostPeep from "./peepForm";
import Delete from "./deletePeep";

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
    const { peeps } = this.state;

    return (
      <Table striped responsive hover>
        <thead>
          <tr>
            <th>Peep</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {peeps.map(peep => {
            return (
              <tr key={peep.id}>
                <td>{peep.body}</td>
                <td>
                  <Delete
                    peepID={peep.id}
                    peepUserId={peep.user.id}
                    currentUser={sessionStorage.getItem("user_id")}
                  ></Delete>
                </td>
              </tr>
            );
          })}
        </tbody>
        <PostPeep />
      </Table>
    );
  }
}
export default Peeps;
