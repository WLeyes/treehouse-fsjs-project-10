const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateUserLogin(data) {
  console.log("[VALIDATION]", data);
  let errors = {};

  data.emailAddress = !isEmpty(data.emailAddress) ? data.emailAddress : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email
  if (validator.isEmpty(data.emailAddress)) {
    errors.emailAddress = "Email is required.";
  }
  if (!validator.isEmail(data.emailAddress)) {
    errors.emailAddress = "Invalid email format.";
  }

  // Password
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
