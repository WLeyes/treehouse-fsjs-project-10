import React, { Component } from "react";
import PropTypes from "prop-types";

import { FormInput, FormTextarea } from "../Layout/formFields";

import { connect } from "react-redux";
import { createCourse } from "../../redux/actions/courseActions";

class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      errors: {}
    };
  }

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  onSubmit = event => {
    const { title, description, estimatedTime, materialsNeeded } = this.state;
    event.preventDefault();
  };

  render() {
    const { onChange, onSubmit } = this;
    const { title, description, estimatedTime, materialsNeeded } = this.state;
    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                <li>Please provide a value for "Title"</li>
                <li>Please provide a value for "Description"</li>
              </ul>
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <FormInput
                  name="title"
                  className="input-title course--title--input"
                  placeholder="Course title..."
                  value={title}
                  onChange={onChange}
                />
                <p>By Joe Smith</p>
              </div>

              <div className="course--description">
                <FormTextarea
                  name="description"
                  className=""
                  placeholder="Course description..."
                  value={description}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <FormInput
                      name="estimatedTime"
                      className="course--time--input"
                      placeholder="Hours"
                      value={estimatedTime}
                      onChange={onChange}
                    />
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <FormTextarea
                      name="materialsNeeded"
                      className=""
                      placeholder="List materials..."
                      value={materialsNeeded}
                      onChange={onChange}
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Create Course
              </button>
              <button className="button button-secondary" onClick={onSubmit}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

CreateCourse.propTypes = {
  errors: PropTypes.object,
  user: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  createCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    course: state.courses.course,
    courseAuthor: state.courses.courseAuthor,
    user: state.users.user,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { createCourse }
)(CreateCourse);
