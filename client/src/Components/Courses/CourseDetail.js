import React, { Component } from "react";
import ReactMarkdown from "react-markdown";

import { connect } from "react-redux";
import { getCourseById } from "../../redux/actions/courseActions";

import ActionBar from "../Layout/actionBar";

class CourseDetail extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.getCourseById(id);
  }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.props.course;
    return (
      <React.Fragment>
        <ActionBar path="{url}" />
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{title}</h3>
              <p>By author</p>
            </div>
            <div className="course--description">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    course: state.courses.course,
    courseAuthor: state.courses.courseAuthor
  };
};

export default connect(
  mapStateToProps,
  { getCourseById }
)(CourseDetail);
