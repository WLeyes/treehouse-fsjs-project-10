import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "react-reveal/Fade";
import ReactMarkdown from "react-markdown";

import { connect } from "react-redux";
import { getCourseById } from "../../redux/actions/courseActions";

import ActionBar from "../Layout/actionBar";

class CourseDetail extends Component {
  componentDidMount() {
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
    const { firstName, lastName } = this.props.author;
    let renderContent;

    if (this.props.loading) {
      renderContent = (
        <CircularProgress style={{ color: "#7c689b" }} thickness={7} />
      );
    } else {
      renderContent = (
        <Fade bottom big>
          <div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{title}</h3>
                <p>
                  By {firstName} {lastName}
                </p>
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
        </Fade>
      );
    }

    return (
      <React.Fragment>
        <ActionBar />
        {renderContent}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  loading: state.courses.loading,
  course: state.courses.course,
  author: state.courses.courseAuthor
});

export default connect(
  mapStateToProps,
  { getCourseById }
)(CourseDetail);
