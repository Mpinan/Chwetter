import React from "react";
import { Button } from "reactstrap";

const Delete = props => {
  const deletePeep = id => {
    fetch(`https://chitter-backend-api-v2.herokuapp.com/peeps/${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token token=" + sessionStorage.getItem("session_key")
      }
    })
      .then(response => response.json())
      .catch(error => {
        console.error("Errorcito:", error);
      });
    //   .then(this.setRedirect());
  };

  //   console.log(props.currentUser, "Hello");
  const handleDelete = () => {
    if (props.currentUser === props.peepUserId) {
      console.log("HEllo");
    }
    deletePeep(props.peepID);
    // }
  };
  return (
    <Button className="btn btn-danger btn-sm" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default Delete;
