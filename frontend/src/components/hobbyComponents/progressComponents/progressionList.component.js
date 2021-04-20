import React from "react";
import Progress from "./progress.component";

// Component to display all progression of a hobby
export default function ProgressionList(props) {
  function progressionToList() {
    if (!props.progression || props?.progression.length === 0) {
      return <p>You have no progression yet for this hobby.</p>;
    }
    //Sort progression from most recent to least recent
    var progressionSorted = props.progression.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    //Map each sorted progress to a progress component
    return progressionSorted.map((progress) => (
      <Progress
        progress={progress}
        hobbyId={props.hobbyId}
        onDeleteProgress={props.onDeleteProgress}
        onFinishEdit={props.onFinishEdit}
      ></Progress>
    ));
  }

  return (
    <div className="container progressionList mt-3">
      <h4>Progression</h4>
      {progressionToList()}
    </div>
  );
}
