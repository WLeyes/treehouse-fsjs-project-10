import React from "react";
import PropTypes from "prop-types";

import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

// check if user is authenticated if so render the content passing the props along else redirect to /forbidden page
const PrivateRoute = ({ user, component: Component, ...remainingProps }) => (
  <Route
    {...remainingProps}
    render={props =>
      user.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/forbidden" />
      )
    }
  />
);

PrivateRoute.prototype = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.users
  };
};
export default connect(mapStateToProps)(PrivateRoute);
