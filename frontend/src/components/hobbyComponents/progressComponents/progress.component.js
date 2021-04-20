import { useState } from "react";
import EditProgress from "./editProgress.component";

//Component displaying the information of a given progress of a hobby
export default function Progress(props) {
  const [editFlag, setEditFlag] = useState(false);

  function onFinishEdit(progress) {
    setEditFlag(false);
    props.onFinishEdit(progress);
  }

  function onCancelEdit() {
    setEditFlag(false);
  }

  return (
    <div key={props.progress._id} className="card progressCard mt-3">
      {/* Loads information of the progress if not in edit mode*/}
      {!editFlag && (
        <div className="card-body">
          <div className="row d-flex justify-content-between mx-0">
            <p className="card-text">
              <i>{new Date(props.progress.date).toDateString()}</i>
            </p>
            {/* Button to switch to edit mode*/}
            <button
              className="btn btn-outline-primary"
              onClick={() => setEditFlag(true)}
            >
              Edit
            </button>
          </div>
          <p className="card-text">{props.progress.description}</p>
        </div>
      )}
      {/* Loads EditProgress component if in edit mode*/}
      {editFlag && (
        <EditProgress
          progress={props.progress}
          hobbyId={props.hobbyId}
          onDeleteProgress={props.onDeleteProgress}
          onFinishEdit={onFinishEdit}
          onCancelEdit={onCancelEdit}
        ></EditProgress>
      )}
    </div>
  );
}
