import React, { Component } from "react";
import { Table } from "reactstrap";
import PostPeep from "./peepForm";
import Delete from "./deletePeep";
import Like from "./like";

class Peeps extends Component {
  state = {
    peeps: []
  };

  componentDidMount() {
    this.getPeeps();
  }

  //   onChange = peeps => {
  //     this.setState({ peeps });
  //   };

  getPeeps() {
    fetch("https://chitter-backend-api-v2.herokuapp.com/peeps")
      .then(response => {
        return response.json();
      })
      .then(result => this.setState({ peeps: result }))
      .then(result => console.log(this.state.peeps, "peeps"))
      .catch(err => console.log(err));
  }

  handleButton(peep) {
    if (peep.user.id == sessionStorage.getItem("user_id")) {
      return (
        <Delete
          //   onChange={this.onChange(peep.user)}
          id={peep.user.id}
          peepID={peep.id}
          peepUserId={peep.user.id}
          currentUser={sessionStorage.getItem("user_id")}
        ></Delete>
      );
    }
  }

  handleLike(peep) {
    return (
      <Like
        id={peep.user.id}
        peepID={peep.id}
        peepUserId={peep.user.id}
        currentUser={sessionStorage.getItem("user_id")}
        liked={peep.likes.user}
      />
    );
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
                <td>{this.handleButton(peep)}</td>
                <td>{this.handleLike(peep)}</td>
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
