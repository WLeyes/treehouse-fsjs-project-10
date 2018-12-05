import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import isEmpty from "../../utils/isEmpty";
import { connect } from "react-redux";

import { FormInput } from "../Layout/formFields";
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
  }

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  onSubmit = event => {
    event.preventDefault();
    const { emailAddress, password, errors } = this.state;
    this.props.getUser(emailAddress, password, this.props.history);
    if (!errors) {
      console.log("no errors?", errors);
    }
  };

  render() {
    const { emailAddress, password, errors } = this.state;
    const { onChange, onSubmit } = this;
    return (
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
              />
              {errors.emailAddress && (
                <div className="validation--errors--label">
                  {errors.emailAddress}
                </div>
              )}

              <FormInput
                name="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={onChange}
              />
              {errors.password && (
                <div className="validation--errors--label">
                  {errors.password}
                </div>
              )}

              <div className="grid-100 pad-bottom">
                {errors.message && (
                  <div className="validation--errors--label">
                    {errors.message}
                  </div>
                )}
                <button className="button" type="submit" onClick={onSubmit}>
                  Sign In
                </button>
                <button className="button button-secondary">Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>
            Don't have a user account? <a href="sign-up.html">Click here</a> to
            sign up!
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getUser }
)(withRouter(UserSignIn));
