import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import Fade from "react-reveal/Fade";

import { deleteCourseById } from "../../redux/actions/courseActions";
import { connect } from "react-redux";

class ActionBar extends Component {
  deleteCourse = event => {
    event.preventDefault();
    this.props.deleteCourseById(
      this.props.course,
      this.props.user,
      this.props.history
    );
  };

  render() {
    const { userId, authorId, match } = this.props;
    return (
      <Fade top delay={500}>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              {userId && userId === authorId ? (
                <span>
                  <Link className="button" to={`${match.url}/update`}>
                    Update Course
                  </Link>
                  <a
                    className="button"
                    href={`${match.url}`}
                    onClick={this.deleteCourse}
                  >
                    Delete Course
                  </a>
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
  }
}

ActionBar.proptypes = {
  authorId: PropTypes.string.isRequired,
  course: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.users.user,
    userId: state.users.user._id,
    course: state.courses.course,
    authorId: state.courses.courseAuthor._id
  };
};

export default connect(
  mapStateToProps,
  { deleteCourseById }
)(withRouter(withRouter(ActionBar)));
