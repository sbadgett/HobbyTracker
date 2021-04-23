import React, { Component } from "react";

{
  /* Home page */
}
export default class Home extends Component {
  render() {
    return (
      <div className="text-center text-white">
        <div className="welcome">
          <h1>Welcome to HobbyTracker!</h1>
          <h5>Track the progress you make in each of your favorite hobbies.</h5>
          <a
            href="/login"
            class="btn mt-2 btn-lg btn-home font-weight-bold border-white bg-white"
          >
            Login
          </a>

          <br />
          <a
            href="/register"
            class="btn mt-2 btn-lg btn-home font-weight-bold border-white bg-white"
          >
            Register
          </a>
        </div>
        <div className="row">
          <div className="tl"></div>
          <div className="tr"></div>
        </div>
        <div className="row">
          <div className="bl"></div>
          <div className="br"></div>
        </div>
      </div>
    );
  }
}
/*
<div className="row">
          <div className="home column">
            <div className="tl"></div>
            <div className="tr"></div>
          </div>
        </div>
        <div className="row">
          <div className="home column">
            <div className="bl"></div>
            <div className="br"></div>
          </div>
        </div>
*/
