import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    let renderContent;
    // check if loading is true, if so render loading bar else display the courses
    if (this.props.loading) {
      renderContent = (
        <CircularProgress style={{ color: "#7c689b" }} thickness={7} />
      );
    } else {
      renderContent = courses.map(course => (
        <Course key={course._id} id={course._id} title={course.title} />
      ));
    }
    return (
      <div className="bounds">
        {renderContent}
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
