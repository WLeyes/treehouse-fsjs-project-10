import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Flip from "react-reveal/Flip";

import { connect } from "react-redux";
import { createCourse } from "../../redux/actions/courseActions";

import { FormInput, FormTextarea } from "../common/formFields";
class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      errors: {},
      user: this.props.user
    };
  }
  // check prop state
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // if the input changes then update its value
  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  // Submit
  onSubmit = event => {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      user
    } = this.state;
    event.preventDefault();
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      user
    };
    this.props.createCourse(course, this.props.history);
  };

  render() {
    const { onChange, onSubmit } = this;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
      user
    } = this.state;
    const author = `${user.firstName} ${user.lastName}`;
    return (
      <Flip right duration={3000}>
        <div className="bounds course--detail">
          <h1>Create Course</h1>
          <div>
            {errors.title || errors.description || errors.message ? (
              <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                  <ul>
                    {errors.title && (
                      <li className="validation--errors--label">
                        {errors.title}
                      </li>
                    )}
                    {errors.description && (
                      <li className="validation--errors--label">
                        {errors.description}
                      </li>
                    )}
                    {errors.message && (
                      <li className="validation--errors--label">
                        {errors.message}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ) : null}
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
                  <p>By {author}</p>
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
                <button className="button" type="submit" onClick={onSubmit}>
                  Create Course
                </button>
                <button
                  className="button button-secondary"
                  onClick={() => this.props.history.push("/")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Flip>
    );
  }
}

CreateCourse.propTypes = {
  errors: PropTypes.object,
  user: PropTypes.object.isRequired,
  createCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.users.user,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { createCourse }
)(withRouter(CreateCourse));
