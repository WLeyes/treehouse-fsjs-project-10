import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Course extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className="grid-33">
        <Link
          className="course--module course--link"
          to={`/courses/${this.props.id}`}
        >
          <h4 className="course--label">Course</h4>
          <h3 className="course--title">{this.props.title}</h3>
        </Link>
      </div>
    );
  }
}
export default Course;
