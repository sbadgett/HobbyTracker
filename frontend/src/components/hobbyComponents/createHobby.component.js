import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import HobbyService from "../../services/hobby.service";
import authService from "../../services/auth.service";

/* Function used in form validation */
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

/* Component used to create a new hobby*/
export default class CreateHobby extends Component {
  constructor(props) {
    super(props);
    this.handleCreateHobby = this.handleCreateHobby.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeGoal = this.onChangeGoal.bind(this);
    this.onChangeImgURL = this.onChangeImgURL.bind(this);

    this.state = {
      name: "",
      goal: "",
      imgurl: "",
      loading: false,
      message: "",
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeGoal(e) {
    this.setState({
      goal: e.target.value,
    });
  }

  onChangeImgURL(e) {
    this.setState({
      imgurl: e.target.value,
    });
  }

  handleCreateHobby(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    /* Makes sure required fields are filled*/
    this.form.validateAll();

    /* Checks for any errors */
    if (this.checkBtn.context._errors.length === 0) {
      /* Uses hobby service to send http request to backend*/
      HobbyService.createHobby(
        this.state.name,
        this.state.goal,
        this.state.imgurl
      ).then(
        (response) => {
          this.setState({
            loading: false,
          });
          /* If successful, update user data with new hobby and redirect to hobbies page*/
          authService.addHobbyToUser(response.data.hobby);
          this.props.history.push("/hobbies");
          window.location.reload();
        },
        (error) => {
          /* Display message on error*/
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="mb-3">
            <h3>Create New Hobby</h3>
            <Form
              onSubmit={this.handleCreateHobby}
              ref={(c) => {
                this.form = c;
              }}
            >
              <div className="form-group">
                <label htmlFor="name">Hobby Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChangeName}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Goal</label>
                <Input
                  type="text"
                  className="form-control"
                  name="goal"
                  value={this.state.goal}
                  onChange={this.onChangeGoal}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Image URL (Decorative)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="imgurl"
                  value={this.state.imgurl}
                  onChange={this.onChangeImgURL}
                />
              </div>

              <div className="form-group">
                <button
                  className="btn btn-outline-primary btn-block"
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Create Hobby</span>
                </button>
              </div>
              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {this.state.message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
