import axios from "axios";
import AuthHeader from "./auth-header";

const APIURL = "/hobbies/";

class ProgressService {
  //Send post request to backend to create progress
  createProgress(date, description, hobbyId) {
    return axios.post(
      APIURL + hobbyId + "/progress",
      {
        date,
        description,
      },
      {
        headers: AuthHeader(),
      }
    );
  }
  //Send put request to backend to update progress
  editProgress(date, description, hobbyId, progressId) {
    return axios.put(
      APIURL + hobbyId + "/progress/" + progressId,
      {
        date,
        description,
      },
      {
        headers: AuthHeader(),
      }
    );
  }
  //Send delete request to backend to delete progress
  deleteProgress(hobbyId, progressId) {
    return axios.delete(APIURL + hobbyId + "/progress/" + progressId, {
      headers: AuthHeader(),
    });
  }
}

export default new ProgressService();
