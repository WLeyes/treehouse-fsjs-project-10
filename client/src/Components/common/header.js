import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import Fade from "react-reveal/Fade";

const Header = props => {
  let nav;

  const logoutUser = () => {};

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
    <Fade top>
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          {nav}
        </div>
        <hr />
      </div>
    </Fade>
  );
};

export default Header;
