import React, { Component } from "react";
import PropTypes from "prop-types";

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
    this.props.createNewUser(newUser);
    // todo: move axios call to redux action
  };

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors
    } = this.state;
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
              <FormInput
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={onChange}
              />
              <FormInput
                name="emailAddress"
                type="email"
                placeholder="Email Address"
                value={emailAddress}
                onChange={onChange}
              />
              <FormInput
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
              />
              <FormInput
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={onChange}
              />
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
)(UserSignUp);
