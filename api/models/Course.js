"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  title: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    trim: true
  },
  estimatedTime: {
    type: String,
    required: false
  },
  materialsNeeded: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("Course", CourseSchema);
