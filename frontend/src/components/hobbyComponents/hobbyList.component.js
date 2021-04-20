import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";

{
  /* Component displaying information (name, goal, image) of each hobby */
}
export default function HobbyList(props) {
  const [currentUser, setCurrentUser] = useState(undefined);

  /* Get user data from local storage first time it loads*/
  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  /* Formats hobbies of user to JSX */
  function hobbiesToList() {
    if (currentUser?.hobbies && currentUser.hobbies.length !== 0) {
      //Check to make sure user has hobbies created
      console.log(currentUser.hobbies);
      return currentUser.hobbies.map((hobby) => (
        //Map each hobby to a card displaying its information
        <div key={hobby._id} className="card mt-3">
          <div className="row">
            <div className="col-md-4">
              <img
                className="img-fluid"
                src={hobby.imgurl ? hobby.imgurl : ""}
                alt=""
              />
            </div>
            <div className="col-md-8 d-flex flex-column justify-content-between">
              <div className="card-body d-flex flex-column justify-content-around">
                <h3 className="card-title">{hobby.name}</h3>
                <h5>{hobby.goal}</h5>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    {
                      /* If details button is clicked, execute function from parent component to switch from HobbyList to a HobbyDetails component*/
                    }
                    props.onClickHobby(hobby);
                  }}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      ));
    } else {
      /* User has no hobbies*/
      return <h5>You have no hobbies to show.</h5>;
    }
  }

  return (
    <div>
      <h2>Your Hobbies</h2>
      {hobbiesToList()}
    </div>
  );
}
