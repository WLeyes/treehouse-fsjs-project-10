import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllCourses } from "../../redux/actions/courseActions";
import Course from "./Course";
class Courses extends Component {
  componentWillMount() {
    this.props.getAllCourses();
  }

  render() {
    const { courses } = this.props.courses;
    return (
      <React.Fragment>
        <div className="bounds">
          {courses.map(course => (
            <Course key={course._id} id={course._id} title={course.title} />
          ))}

          <div className="grid-33">
            <Link
              className="course--module course--add--module"
              to="/courses/create"
            >
              <h3 className="course--add--title">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 13 13"
                  className="add"
                >
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
                </svg>
                New Course
              </h3>
            </Link>
          </div>
        </div>
      </React.Fragment>
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
