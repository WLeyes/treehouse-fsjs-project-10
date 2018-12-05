const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateNewCourse(data) {
  console.log("[VALIDATION]", data);
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  // Title
  if (validator.isEmpty(data.title)) {
    errors.title = "Title is required.";
  }

  // password
  if (validator.isEmpty(data.description)) {
    errors.description = "Description is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
