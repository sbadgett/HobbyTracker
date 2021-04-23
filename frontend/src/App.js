import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

import Login from "./components/authComponents/login.component";
import Register from "./components/authComponents/register.component";
import Home from "./components/home.component";
import AuthService from "./services/auth.service";
import Hobbies from "./components/hobbyComponents/hobbies.component";
import HobbyCreate from "./components/hobbyComponents/createHobby.component";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  function logOut() {
    AuthService.logout();
  }

  return (
    <div className="App">
      {/* Header */}
      <nav className="navbar sticky-top navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          HobbyTracker
        </Link>

        {/* Provide links to hobbies and new hobby in header if a user is logged in */}
        {currentUser && (
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/hobbies"} className="nav-link">
                Hobbies
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/hobbies/new"} className="nav-link">
                New Hobby
              </Link>
            </li>
          </div>
        )}

        {/* On right side of header, have logout if a user is logged in, otherwise have register and login links*/}
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Log Out
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Register
              </Link>
            </li>
          </div>
        )}
      </nav>
      {/* End of header */}

      {/* Main content determined by Route switch */}
      <div className="content-wrap">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/hobbies" component={Hobbies} />
          <Route exact path="/hobbies/new" component={HobbyCreate} />
        </Switch>
      </div>

      <footer class="footer bg-dark mt-auto py-2">
        <div className="container">
          <span class="text-muted">HobbyTracker 2021</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
