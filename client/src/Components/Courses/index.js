import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getAllCourses } from "../../redux/actions/courseActions";

import Course from "./course";
import NewCourse from "./newCourse";
class Courses extends Component {
  componentWillMount() {
    this.props.getAllCourses();
  }

  render() {
    const { courses } = this.props.courses;
    return (
      <div className="bounds">
        {courses.map(course => (
          <Course key={course._id} id={course._id} title={course.title} />
        ))}
        <NewCourse />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: state.courses,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { getAllCourses }
)(Courses);
