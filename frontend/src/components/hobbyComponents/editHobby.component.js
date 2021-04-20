import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import HobbyService from "../../services/hobby.service";
import authService from "../../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

/* Component used to edit name, goal, and image url of a hobby */
export default class EditHobby extends Component {
  constructor(props) {
    super(props);
    this.handleEditHobby = this.handleEditHobby.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeGoal = this.onChangeGoal.bind(this);
    this.onChangeImgURL = this.onChangeImgURL.bind(this);

    this.state = {
      loading: false,
      message: "",
      name: this.props.hobby.name,
      goal: this.props.hobby.goal,
      imgurl: this.props.hobby.imgurl,
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

  handleEditHobby(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    /* Ensures no errors before proceeding*/
    if (this.checkBtn.context._errors.length === 0) {
      /* Use hobby service to send http put request to backend*/
      HobbyService.editHobby(
        this.state.name,
        this.state.goal,
        this.state.imgurl,
        this.props.hobby._id
      ).then(
        (response) => {
          this.setState({
            loading: false,
          });
          /* If successful, update user data and use prop function of parent component to return*/
          authService.updateHobbyToUser(response.data.hobby);
          this.props.onFinishHobbyEdit(response.data.hobby);
        },
        (error) => {
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
            <h3>Edit Hobby</h3>
            <Form
              onSubmit={this.handleEditHobby}
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
                  className="btn btn-outline-primary"
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Save Changes</span>
                </button>
              </div>
              <div className="form-group">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    this.props.onFinishHobbyEdit(null);
                  }}
                >
                  <span>Cancel Changes</span>
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
