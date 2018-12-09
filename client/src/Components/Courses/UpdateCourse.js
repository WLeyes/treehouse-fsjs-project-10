import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { FormInput, FormTextarea } from "../common/formFields";
import Fade from "react-reveal/Fade";
import isEmpty from "../../utils/isEmpty";

import { connect } from "react-redux";
import {
  getCourseById,
  updateCourseById
} from "../../redux/actions/courseActions";

class UpdateCourse extends Component {
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

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getCourseById(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.course) {
      const course = nextProps.course;
      course.title = !isEmpty(course.title) ? course.title : "";
      course.description = !isEmpty(course.description)
        ? course.description
        : "";
      course.estimatedTime = !isEmpty(course.estimatedTime)
        ? course.estimatedTime
        : "";
      course.materialsNeeded = !isEmpty(course.materialsNeeded)
        ? course.materialsNeeded
        : "";
      this.setState({
        title: course.title,
        description: course.description,
        estimatedTime: course.estimatedTime,
        materialsNeeded: course.materialsNeeded
      });
    }
  }

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  onSubmit = event => {
    event.preventDefault();
    const { _id } = this.props.course;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      user
    } = this.state;
    const course = {
      _id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      user
    };

    this.props.updateCourseById(
      _id,
      course,
      this.state.user,
      this.props.history
    );
  };

  // Updates the current course
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
      <Fade right big>
        <div className="bounds course--detail">
          <h1>Update Course</h1>
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
                <button className="button" type="submit">
                  Update Course
                </button>
                <button className="button button-secondary" onClick={onSubmit}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Fade>
    );
  }
}

UpdateCourse.propTypes = {
  errors: PropTypes.object,
  user: PropTypes.object.isRequired,
  getCourseById: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.users.user,
    course: state.courses.course,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { getCourseById, updateCourseById }
)(withRouter(UpdateCourse));
