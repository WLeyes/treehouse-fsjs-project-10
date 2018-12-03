const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateUserSignUp(data) {
  console.log("[VALIDATION]", data);
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.emailAddress = !isEmpty(data.emailAddress) ? data.emailAddress : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  // First name
  if (!validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = "Name must be between 2 and 30 characters.";
  }
  if (validator.isEmpty(data.firstName)) {
    errors.firstName = "First name is required.";
  }

  // Last name
  if (!validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = "Name must be between 2 and 30 characters.";
  }
  if (validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name is required.";
  }

  // Email
  if (!validator.isEmail(data.emailAddress)) {
    errors.emailAddress = "Invalid email format.";
  }
  if (validator.isEmpty(data.emailAddress)) {
    errors.emailAddress = "Email is required.";
  }

  // Password
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters.";
  }

  // Confirm password
  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm password is required.";
  }

  //  Passwords match
  if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Passwords must match.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
