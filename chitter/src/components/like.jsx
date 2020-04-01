import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheckCircle
} from "@fortawesome/free-regular-svg-icons";

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
  };

  const handleLike = () => {
    addLike(props.peepID, props.currentUser);
  };

  const handleUnLike = () => {
    removeLike(props.peepID, props.currentUser);
  };

  const removeLike = (id, idUser) => {
    fetch(
      `https://chitter-backend-api-v2.herokuapp.com/peeps/${id}/likes/${idUser}`,
      {
        method: "Delete",
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
  };

  const handleIcon = () => {
    const likes = [...props.likes];
    // console.log(likes);
    likes.map(like => {
      if (props.currentUser === like.user) {
        return (
          <div>
            <FontAwesomeIcon
              icon={faTimesCircle}
              onClick={handleLike}
              style={{ cursor: "pointer" }}
            />
          </div>
        );
      }
      return (
        <div>
          <FontAwesomeIcon
            icon={faCheckCircle}
            onClick={handleUnLike}
            style={{ cursor: "pointer" }}
          />
        </div>
      );
    });
  };

  return <div>{handleIcon()}</div>;
};

export default Like;
