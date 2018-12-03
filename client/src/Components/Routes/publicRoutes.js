import React from "react";
import { Route, Redirect } from "react-router-dom";

// this route is for future useage where if user session is saved or cached
// when implemented, if a user is logged in and goes to a route that is restricted because they are logged in (signin and signup pages) then redirect to home
const PublicRoute = ({ user, component: Component, ...remainingProps }) => {
  return (
    <Route
      {...remainingProps}
      component={props =>
        remainingProps.restricted ? (
          user && user.length >= 1 ? (
            <Redirect to={"/"} />
          ) : (
            <Component {...props} user={user} />
          )
        ) : (
          <Component {...props} user={user} />
        )
      }
    />
  );
};

export default PublicRoute;
