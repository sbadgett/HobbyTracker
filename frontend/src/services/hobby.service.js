import axios from "axios";
import AuthHeader from "./auth-header";

const APIURL = "/hobbies/";

class HobbyService {
  //Send post request to backend to create hobby
  createHobby(name, goal, imgurl) {
    return axios.post(
      APIURL,
      {
        name,
        goal,
        imgurl,
      },
      {
        headers: AuthHeader(),
      }
    );
  }
  //Send put request to backend to update hobby
  editHobby(name, goal, imgurl, id) {
    return axios.put(
      APIURL + id,
      {
        name,
        goal,
        imgurl,
      },
      {
        headers: AuthHeader(),
      }
    );
  }
  //Send delete request to backend to delete hobby
  deleteHobby(id) {
    return axios.delete(APIURL + id, {
      headers: AuthHeader(),
    });
  }
}

export default new HobbyService();
