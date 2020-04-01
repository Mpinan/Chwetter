import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrinBeam } from "@fortawesome/free-regular-svg-icons";

const Like = props => {
  const addLike = (id, idUser) => {
    fetch(
      `https://chitter-backend-api-v2.herokuapp.com/peeps/${id}/likes/${idUser}`,
      {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token token=" + sessionStorage.getItem("session_key")
        }
      }
    )
      .then(response => response.json())
      .catch(error => {
        console.error("Errorcito:", error);
      });
    //   .then(this.setRedirect());
  };
  const handleLike = () => {
    addLike(props.peepID, props.currentUser);
  };
  const removeLike = id => {
    fetch(`https://chitter-backend-api-v2.herokuapp.com/peeps/${id}/likes/1`, {
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

  return (
    <FontAwesomeIcon
      icon={faGrinBeam}
      onClick={handleLike}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Like;
