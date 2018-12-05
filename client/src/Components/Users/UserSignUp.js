import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createNewUser } from "../../redux/actions/userActions";

import { FormInput } from "../Layout/formFields";

class UserSignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  onSubmit = event => {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    } = this.state;
    event.preventDefault();
    const newUser = {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    };
    this.props.createNewUser(newUser, this.props.history);
  };

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    } = this.state;
    const { errors } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <form onSubmit={onSubmit}>
              <FormInput
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={onChange}
              />
              {errors.firstName && (
                <div className="validation--errors--label">
                  {errors.firstName}
                </div>
              )}

              <FormInput
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={onChange}
              />
              {errors.lastName && (
                <div className="validation--errors--label">
                  {errors.lastName}
                </div>
              )}

              <FormInput
                name="emailAddress"
                type="email"
                placeholder="Email Address"
                value={emailAddress}
                onChange={onChange}
              />
              {errors.emailAddress && (
                <div className="validation--errors--label">
                  {errors.emailAddress}
                </div>
              )}

              <FormInput
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
              />
              {errors.password && (
                <div className="validation--errors--label">
                  {errors.password}
                </div>
              )}

              <FormInput
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={onChange}
              />
              {errors.confirmPassword && (
                <div className="validation--errors--label">
                  {errors.confirmPassword}
                </div>
              )}

              <div className="grid-100 pad-bottom">
                <button className="button" type="submit" onClick={onSubmit}>
                  Sign Up
                </button>
                <button className="button button-secondary">Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>
            Already have a user account? <a href="sign-in.html">Click here</a>{" "}
            to sign in!
          </p>
        </div>
      </div>
    );
  }
}

UserSignUp.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.users.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createNewUser }
)(withRouter(UserSignUp));
