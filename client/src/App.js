import React, { Component } from "react";
import "./css/global.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./Components/Layout";
import PublicRoute from "./Components/Routes/publicRoutes";

import UserSignUp from "./Components/Users/UserSignUp";
import UserSignIn from "./Components/Users/UserSignin";

import Courses from "./Components/Courses";
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
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
