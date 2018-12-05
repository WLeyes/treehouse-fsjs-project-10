import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Courses extends Component {
  componentWillMount() {
    // this.props.getAllCourses();
  }

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <div className="bounds">
          <div className="grid-33">
            <a
              className="course--module course--link"
              href="course-detail.html"
            >
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">Build a Basic Bookcase</h3>
            </a>
          </div>
          <div className="grid-33">
            <a
              className="course--module course--link"
              href="course-detail.html"
            >
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">Learn How to Program</h3>
            </a>
          </div>
          <div className="grid-33">
            <a
              className="course--module course--link"
              href="course-detail.html"
            >
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">Learn How to Test Programs</h3>
            </a>
          </div>
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
    courses: state.courses
  };
};

export default connect(mapStateToProps)(Courses);
