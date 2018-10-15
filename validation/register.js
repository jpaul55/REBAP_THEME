const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  let errorImage = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  //data = !isEmpty(data) ? data : "";

  if (!validator.isLength(data.firstname, { min: 2, max: 30 })) {
    errors.firstname = "Firstname must be between 2 and 30 characters";
  }

  if (validator.isEmpty(data.firstname)) {
    errors.firstname = "Firstname is required";
  }

  if (validator.isEmpty(data.lastname)) {
    errors.lastname = "Lastname is required";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (validator.isEmpty(data.prcid)) {
    errors.prcid = "PRC ID is required";
  }

  // if (validator.isEmpty(data.receipt)) {
  //   errors.receipt =
  //     "Please upload an image copy of the receipt of REBAP Membership";
  // }

  // if (validator.isEmpty(data.dateofbirth)) {
  //   errors.dateofbirth = "Birthday is required";
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
