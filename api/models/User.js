"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  password: {
    type: String,
    required: true
  },

  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  emailAddress: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("User", UserSchema);
