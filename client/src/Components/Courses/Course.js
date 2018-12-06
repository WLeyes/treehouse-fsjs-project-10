import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Course = props => {
  return (
    <div className="grid-33">
      <Link className="course--module course--link" to={`/courses/${props.id}`}>
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{props.title}</h3>
      </Link>
    </div>
  );
};

Course.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
export default Course;
