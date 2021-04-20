import AuthService from "../../services/auth.service";
import HobbyService from "../../services/hobby.service";
import ProgressionList from "./progressComponents/progressionList.component";
import CreateProgress from "./progressComponents/createProgress.component";
import EditHobby from "./editHobby.component";
import React, { useState } from "react";

/* The HobbyDetails encapsulates more specific information on a hobby including existing progress, progress
    creation/changes/delete, edits to hobby information, and hobby deletion */
export default function HobbyDetails(props) {
  const [editHobbyFlag, setEditHobbyFlag] = useState(false);
  const [hobby, setHobby] = useState(props.hobby);
  const [, setState] = useState();

  /* Called when delete button is clicked, handles deletion of the hobby*/
  function handleClickDelete() {
    // Send http delete request to backend for the hobby
    HobbyService.deleteHobby(hobby._id).then(
      (response) => {
        //Upon succesful return, update user data to reflect deletion
        AuthService.deleteHobbyFromUser(response.data?.hobby?._id);
        props.onReturn();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
      }
    );
  }

  //Updates hobby state on editing of hobby information
  function onFinishHobbyEdit(hobbyChanges) {
    if (hobbyChanges) {
      hobby.name = hobbyChanges.name;
      hobby.goal = hobbyChanges.goal;
      setHobby(hobby);
    }
    setEditHobbyFlag(false);
  }

  //Adds new progress to hobby state
  function onCreateProgress(progress) {
    hobby.progression.push(progress);
    setHobby(hobby);
    setState({});
  }

  //Updates progress data to hobby state
  function onFinishProgressEdit(progress) {
    const indexToUpdate = hobby.progression.findIndex(
      (element) => element._id === progress._id
    );
    hobby.progression.splice(indexToUpdate, 1);
    hobby.progression.splice(indexToUpdate, 0, progress);
    setHobby(hobby);
    setState({});
  }

  //Removes progress from hobby state
  function onDeleteProgress(progressId) {
    const indexToRemove = hobby.progression.findIndex(
      (element) => element._id === progressId
    );
    hobby.progression.splice(indexToRemove, 1);
    setHobby(hobby);
    setState({});
  }

  //Toggles flag controlling EditHobby component
  function handleClickEdit() {
    setEditHobbyFlag(true);
  }

  return (
    <div className="container hobbyDetails">
      {/* Load EditHobby component if editHobbyFlag is true*/}
      {editHobbyFlag && (
        <EditHobby hobby={hobby} onFinishHobbyEdit={onFinishHobbyEdit} />
      )}
      {/* Otherwise load this */}
      {!editHobbyFlag && (
        <div>
          {/* Top of page */}
          <div className="row">
            <div className="col-12">
              <h2>{hobby.name}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">Current Goal: {hobby.goal}</div>
          </div>
          <div className="row d-flex justify-content-between mt-3">
            {/* Button to return to HobbyList component by using prop function from parent Hobbies component*/}
            <button
              className="btn btn-outline-primary"
              onClick={props.onReturn}
            >
              Back to Hobbies
            </button>
            {/* Button to load HobbyEdit by toggling flag to true via handleClickEdit */}
            <button
              className="btn btn-md btn-outline-primary"
              onClick={handleClickEdit}
            >
              Edit Hobby
            </button>
            <button className="btn-outline-primary invisible">
              Back to Hobbies
            </button>
          </div>
          {/* End top of page */}
          <hr></hr>
          <div className="row">
            {/* Bottom left side of page load create progress component and image of hobby*/}
            <div className="col-md-6 hobbyDetailsLeft">
              <CreateProgress
                hobbyId={hobby._id}
                onCreateProgress={onCreateProgress}
              />
              <img
                className="img-fluid"
                src={hobby.imgurl ? hobby.imgurl : ""}
                alt=""
              />
            </div>
            {/* Bottom right side of page is the progression list component */}
            <div className="col-md-6 hobbyDetailsRight">
              <ProgressionList
                progression={hobby.progression}
                hobbyId={hobby._id}
                onDeleteProgress={onDeleteProgress}
                onFinishEdit={onFinishProgressEdit}
              />
            </div>
          </div>
          {/* Button to delete form is at very bottom */}
          <button
            className="btn btn-md btn-outline-danger mt-5"
            onClick={handleClickDelete}
          >
            Delete Hobby
          </button>
        </div>
      )}
    </div>
  );
}
