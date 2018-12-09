import React, { Component } from "react";
import "./css/global.css";

import { BrowserRouter as Router, Switch } from "react-router-dom";

// Routes
import PublicRoute from "./Components/Routes/publicRoutes";
import PrivateRoute from "./Components/Routes/privateRoutes";

// Components
import Header from "./Components/common/header";

import UserSignUp from "./Components/Users/UserSignUp";
import UserSignIn from "./Components/Users/UserSignin";

import Courses from "./Components/Courses";
import CourseDetail from "./Components/Courses/CourseDetail";
import CreateCourse from "./Components/Courses/CreateCourse";
import UpdateCourse from "./Components/Courses/UpdateCourse";

import Forbidden from "./Components/Errors/forbidden";
import UnhandledError from "./Components/Errors/unhandledError";
import NotFound from "./Components/Errors/notFound";

// Redux
import { connect } from "react-redux";
import store from "./redux";
import {
  setCurrentUser,
  getUser,
  logoutUser
} from "./redux/actions/userActions";
import setAuthToken from "./utils/setAuthToken";

// Check if user is in localStorage
if (localStorage.user) {
  setAuthToken(localStorage.user);
  const user = JSON.parse(localStorage.user);
  store.dispatch(setCurrentUser(user));
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      errors: {}
    };
  }
  // Check for update to props state
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    return (
      <Router>
        <React.Fragment>
          <Header user={this.props.user} logout={this.props.logoutUser} />
          <Switch>
            <PublicRoute
              restricted={false}
              {...this.props}
              exact
              path="/"
              component={Courses}
            />

            <PrivateRoute
              restricted={false}
              exact
              path="/courses/create"
              component={CreateCourse}
            />

            <PrivateRoute
              restricted={false}
              exact
              path="/courses/:id/update"
              component={UpdateCourse}
            />

            <PublicRoute
              restricted={false}
              {...this.props}
              exact
              path="/courses/:id"
              component={CourseDetail}
            />

            <PublicRoute
              restricted={true}
              {...this.props}
              exact
              path="/signin"
              component={UserSignIn}
            />

            <PublicRoute
              restricted={true}
              {...this.props}
              exact
              path="/signup"
              component={UserSignUp}
            />

            <PublicRoute
              restricted={false}
              {...this.props}
              exact
              path="/forbidden"
              component={Forbidden}
            />

            <PublicRoute
              restricted={false}
              {...this.props}
              exact
              path="/error"
              component={UnhandledError}
            />

            <PublicRoute
              restricted={false}
              {...this.props}
              component={NotFound}
            />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { setCurrentUser, getUser, logoutUser }
)(App);
