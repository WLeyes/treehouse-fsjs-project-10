import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

const ActionBar = () => {
  return (
    <div className="actions--bar">
      <div className="bounds">
        <div className="grid-100">
          {this.props.user._id ? (
            <span>
              <Link
                className="button"
                to={`/courses/${this.props.course._id}/update`}
              >
                Update Course
              </Link>
              <Link className="button" to="/">
                Delete Course
              </Link>
            </span>
          ) : null}
          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.users.user,
    course: state.courses.course
  };
};

export default connect(mapStateToProps)(ActionBar);
