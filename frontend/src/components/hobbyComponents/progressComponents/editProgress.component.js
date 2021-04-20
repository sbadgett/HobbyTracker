import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import ProgressService from "../../../services/progress.service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthService from "../../../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

{
  /* Component to edit the information of a progress (date and description) */
}
export default class EditProgress extends Component {
  constructor(props) {
    super(props);
    this.handleEditProgress = this.handleEditProgress.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDeleteProgress = this.handleDeleteProgress.bind(this);

    this.state = {
      date: new Date(props.progress.date),
      description: props.progress.description,
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

  handleDeleteProgress() {
    this.setState({
      message: "",
      loading: true,
    });

    if (this.checkBtn.context._errors.length === 0) {
      //Use ProgressService to send http put request to backend to update progress
      ProgressService.deleteProgress(
        this.props.hobbyId,
        this.props.progress._id
      ).then(
        (response) => {
          this.setState({
            loading: false,
          });
          //If successful, update user data with updated progress
          AuthService.deleteProgressFromUser(response.data.progress);
          this.props.onDeleteProgress(response.data.progress._id);
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

  handleEditProgress(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      //Uses progress service to send http put request to backend
      ProgressService.editProgress(
        this.state.date,
        this.state.description,
        this.props.hobbyId,
        this.props.progress._id
      ).then(
        (response) => {
          this.setState({
            loading: false,
          });
          //If successful, updates user data to reflect change to progress
          AuthService.updateProgressToUser(response.data.progress);
          this.props.onFinishEdit(response.data.progress);
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
          <Form
            onSubmit={this.handleEditProgress}
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

            <div className="form-group d-flex justify-content-between">
              <button
                className="btn btn-outline-primary"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Save Changes</span>
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={this.props.onCancelEdit}
              >
                <span>Cancel Changes</span>
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={this.handleDeleteProgress}
              >
                <span>Delete Progress</span>
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
