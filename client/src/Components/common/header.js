import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

const Header = props => {
  const { isAuthenticated, user } = props.user;
  let nav;
  //  check if the user is authenticated if so greet them else display signin & signup buttons
  isAuthenticated
    ? (nav = (
        <nav>
          <span>
            Welcome {user.firstName} {user.lastName}!
          </span>
          <Link className="signout" to="/" onClick={props.logout}>
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

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default Header;
