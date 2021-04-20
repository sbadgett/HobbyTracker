import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import ProgressService from "../../../services/progress.service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthService from "../../../services/auth.service";

/* Helper function to validate required form elements */
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

/* Component to create a new progress for a hobby*/
export default class CreateProgress extends Component {
  constructor(props) {
    super(props);
    this.handleCreateProgress = this.handleCreateProgress.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);

    this.state = {
      date: "",
      description: "",
      loading: false,
      message: "",
    };
  }

  handleDateChange(date) {
    this.setState({
      date,
    });
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  handleCreateProgress(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      /* Use progress service to send http post request to create new progress*/
      ProgressService.createProgress(
        this.state.date,
        this.state.description,
        this.props.hobbyId
      ).then(
        (response) => {
          this.setState({
            loading: false,
          });
          //If successful, update user data with new progress
          AuthService.addProgressToUser(response.data?.progress);
          this.props.onCreateProgress(response.data.progress);
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
      <div className="container">
        <div className="mt-3">
          <h4>Create New Progress</h4>
          <Form
            onSubmit={this.handleCreateProgress}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <DatePicker
                selected={this.state.date}
                onChange={this.handleDateChange}
                name="date"
                dateFormat="MM/dd/yyyy"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Description</label>
              <textarea
                type="text"
                className="form-control"
                name="Description"
                value={this.state.description}
                onChange={this.onChangeDescription}
                validations={[required]}
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
                <span>Create Progress</span>
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
    );
  }
}
