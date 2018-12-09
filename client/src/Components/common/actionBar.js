import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import Fade from "react-reveal/Fade";

import { connect } from "react-redux";
const ActionBar = props => {
  return (
    <Fade top delay={500}>
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            {props.userId && props.userId === props.authorId ? (
              <span>
                <Link className="button" to={`${props.match.url}/update`}>
                  Update Course
                </Link>
                <Link className="button" to={`${props.match.url}/delete`}>
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
    </Fade>
  );
};

ActionBar.proptypes = {
  authorId: PropTypes.string.isRequired,
  course: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    userId: state.users.user._id,
    course: state.courses.course,
    authorId: state.courses.courseAuthor._id
  };
};

export default connect(mapStateToProps)(withRouter(ActionBar));
