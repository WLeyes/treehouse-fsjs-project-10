import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

const Header = props => {
  let nav;

  const logoutUser = () => {
    this.setState({
      user: null
    });
  };

  props.user._id
    ? (nav = (
        <nav>
          <span>
            Welcome {props.user.firstName} {props.user.lastName}!
          </span>
          <Link className="signout" to="/" onClick={logoutUser}>
            Sign Out
          </Link>
        </nav>
      ))
    : (nav = (
        <nav>
          <Link className="signup" to="/signup">
            Sign Up
          </Link>
          <Link className="signin" to="/signin">
            Sign In
          </Link>
        </nav>
      ));
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        {nav}
      </div>
      <hr />
    </div>
  );
};
Header.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  _id: PropTypes.string
};

const mapStateToProps = state => {
  return {
    user: state.users.user
  };
};

export default connect(mapStateToProps)(Header);
