import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ user, component: Component, ...remainingProps }) => {
  return (
    <Route
      {...remainingProps}
      component={props =>
        user && user.length >= 1 ? (
          <Component {...props} user={user} />
        ) : (
          <Redirect to="/forbidden" />
        )
      }
    />
  );
};

export default PrivateRoute;
