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
      .catch(err => console.log(err));
  }

  handleDelete(peep) {
    if (peep.user.id == sessionStorage.getItem("user_id")) {
      return (
        <Delete
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
        likes={peep.likes}
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
                <td>{this.handleDelete(peep)}</td>
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
