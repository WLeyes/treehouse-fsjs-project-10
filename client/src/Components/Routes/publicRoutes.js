import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

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
