const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateUserLogin(data) {
  console.log("[VALIDATION]", data);
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.pass = !isEmpty(data.pass) ? data.pass : "";

  // Email
  if (!validator.isEmail(data.name)) {
    errors.emailAddress = "Invalid email format.";
  }

  if (validator.isEmpty(data.name)) {
    errors.emailAddress = "Email is required.";
  }

  // password
  if (validator.isEmpty(data.pass)) {
    errors.password = "Password is required.";
  }
  if (!validator.isLength(data.pass, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
