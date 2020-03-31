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

  const handleDelete = () => {
    deletePeep(props.peepID);
  };

  return (
    <Button
      id={props.currenUser}
      className="btn btn-danger btn-sm"
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
};

export default Delete;
