import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Flip from "react-reveal/Flip";

import { connect } from "react-redux";

import { FormInput } from "../common/formFields";
import { getUser } from "../../redux/actions/userActions";

class UserSignIn extends Component {
  constructor() {
    super();
    this.state = {
      emailAddress: "",
      password: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    // if (nextProps.auth.isAuthenticated) {
    //   this.props.history.push("/");
    // }
  }

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  onSubmit = event => {
    event.preventDefault();
    const { emailAddress, password } = this.state;
    const user = {
      emailAddress,
      password
    };
    this.props.getUser(user, this.props.history);
  };

  render() {
    const { emailAddress, password, errors } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <Flip bottom>
        <div className="bounds">
          <div className="grid-33 centered signin">
            <h1>Sign In</h1>
            <div>
              <form onSubmit={onSubmit}>
                <FormInput
                  name="emailAddress"
                  type="email"
                  placeholder="Email Address"
                  value={emailAddress}
                  onChange={onChange}
                  error={errors.emailAddress}
                />

                <FormInput
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={onChange}
                  error={errors.password}
                />

                {
                  <div className="validation--errors--label">
                    {errors.message}
                  </div>
                }
                <div className="grid-100 pad-bottom">
                  <button className="button" type="submit" onClick={onSubmit}>
                    Sign In
                  </button>
                  <button className="button button-secondary">Cancel</button>
                </div>
              </form>
            </div>
            <p>&nbsp;</p>
            <p>
              Don't have a user account? <a href="sign-up.html">Click here</a>{" "}
              to sign up!
            </p>
          </div>
        </div>
      </Flip>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  auth: state.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getUser }
)(withRouter(UserSignIn));
