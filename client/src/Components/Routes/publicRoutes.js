import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

// Check if user is authenticated, if so and the route is restricted then redirect them to the home route
// this is a way to block them from the signin and signup pages as they do not need to access it
const PublicRoute = ({ user, component: Component, ...remainingProps }) => (
  <Route
    {...remainingProps}
    render={props =>
      remainingProps.restricted === true ? (
        user.isAuthenticated === true ? (
          <Redirect to={"/"} />
        ) : (
          <Component {...props} />
        )
      ) : (
        <Component {...props} />
      )
    }
  />
);

PublicRoute.prototype = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.users
  };
};

export default connect(mapStateToProps)(PublicRoute);
