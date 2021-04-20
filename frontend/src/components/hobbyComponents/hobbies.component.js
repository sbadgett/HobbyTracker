import React, { useState } from "react";
import HobbyDetails from "./hobbyDetails.component";
import HobbyList from "./hobbyList.component";

/* Component encapsulating the display of list of all hobbies or details of a specific hobby */
export default function Hobbies(props) {
  const [detailsFlag, setDetailsFlag] = useState(false);
  const [selectedHobby, setSelectedHobby] = useState(undefined);

  function onReturnFromHobbyDetails() {
    setSelectedHobby(undefined);
    setDetailsFlag(false);
  }

  function onClickHobbyDetails(hobby) {
    setSelectedHobby(hobby);
    setDetailsFlag(true);
  }

  return (
    <div className="hobbyList">
      {/* Initially display the HobbyList Component*/}
      {!detailsFlag && <HobbyList onClickHobby={onClickHobbyDetails} />}
      {/* If a hobby is selected, load the HobbyDetails component*/}
      {detailsFlag && (
        <HobbyDetails
          hobby={selectedHobby}
          onReturn={onReturnFromHobbyDetails}
        />
      )}
    </div>
  );
}
