import axios from "axios";

const API_URL = "/user/";

class AuthService {
  //Send post request to backend to log in user
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          //Store authorized user in local storage
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  //Remove user data from local storage effectively logging user out
  logout() {
    localStorage.removeItem("user");
  }

  //Send post request to backend to register a new user
  register(name, email, password) {
    return axios
      .post(API_URL + "register", {
        name,
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          //Store authorized user in local
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  //Return the user data stored in local storage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  //Add hobby to local storage
  addHobbyToUser(hobby) {
    const user = JSON.parse(localStorage.getItem("user"));
    user.hobbies.push(hobby);
    localStorage.setItem("user", JSON.stringify(user));
  }

  //Add progress to local storage
  addProgressToUser(progress) {
    const user = JSON.parse(localStorage.getItem("user"));
    const hobby = user.hobbies.find(
      (element) => element._id === progress.hobbyId
    );
    hobby.progression.push(progress);
    localStorage.setItem("user", JSON.stringify(user));
  }

  //Delete hobby from local storage
  deleteHobbyFromUser(id) {
    const user = JSON.parse(localStorage.getItem("user"));
    const indexToRemove = user.hobbies.findIndex(
      (element) => element._id === id
    );
    user.hobbies.splice(indexToRemove, 1);
    localStorage.setItem("user", JSON.stringify(user));
  }

  //Delete progress from local storage
  deleteProgressFromUser(progress) {
    const user = JSON.parse(localStorage.getItem("user"));
    const hobby = user.hobbies.find(
      (element) => element._id === progress.hobbyId
    );
    const indexToRemove = hobby.progression.findIndex(
      (element) => element._id === progress._id
    );
    hobby.progression.splice(indexToRemove, 1);
    localStorage.setItem("user", JSON.stringify(user));
  }

  //Update hobby data in local storage
  updateHobbyToUser(hobby) {
    const user = JSON.parse(localStorage.getItem("user"));
    const indexToUpdate = user.hobbies.findIndex(
      (element) => element._id === hobby._id
    );
    user.hobbies[indexToUpdate].name = hobby.name;
    user.hobbies[indexToUpdate].goal = hobby.goal;
    user.hobbies[indexToUpdate].url = hobby.imgurl;
    localStorage.setItem("user", JSON.stringify(user));
  }

  //Update progress data in local storage
  updateProgressToUser(progress) {
    const user = JSON.parse(localStorage.getItem("user"));
    const hobby = user.hobbies.find(
      (element) => element._id === progress.hobbyId
    );
    const indexToUpdate = hobby.progression.findIndex(
      (element) => element._id === progress._id
    );
    hobby.progression.splice(indexToUpdate, 1);
    hobby.progression.splice(indexToUpdate, 0, progress);
    localStorage.setItem("user", JSON.stringify(user));
  }
  e;
}

export default new AuthService();
