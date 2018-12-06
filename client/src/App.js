import React, { Component } from "react";
import "./css/global.css";

import { BrowserRouter as Router, Switch } from "react-router-dom";

import Layout from "./Components/Layout";
import PublicRoute from "./Components/Routes/publicRoutes";
import PrivateRoute from "./Components/Routes/privateRoutes";

import UserSignUp from "./Components/Users/UserSignUp";
import UserSignIn from "./Components/Users/UserSignin";

import Courses from "./Components/Courses";
import CourseDetail from "./Components/Courses/CourseDetail";
import CreateCourse from "./Components/Courses/CreateCourse";
import UpdateCourse from "./Components/Courses/UpdateCourse";

import Forbidden from "./Components/Errors/forbidden";
import UnhandledError from "./Components/Errors/unhandledError";
import NotFound from "./Components/Errors/notFound";
class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
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
              exact
              path="/unhandledError"
              component={UnhandledError}
            />

            <PublicRoute
              restricted={false}
              {...this.props}
              component={NotFound}
            />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
