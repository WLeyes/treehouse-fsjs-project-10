"use strict";

const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const auth = require("basic-auth");

router.param("cID", function(req, res, next, id) {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    // Check that id is a valid ObjectId
    Course.findById(id, function(error, doc) {
      if (error) return next(error);
      if (!doc) {
        const error = new Error("Not Found");
        error.status = 404;
        return next(error);
      }
      req.course = doc;
      return next();
    }).populate("user", "firstName lastName");
  } else {
    const error = new Error("Not Found");
    error.status = 404;
    return next(error);
  }
});

// CREATE - POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
router.post("/", (req, res, next) => {
  Course.find({ title: req.body.title })
    .exec()
    .then(course => {
      if (course.length >= 1) {
        return res.status(409).json({
          message: "There is already a course with that title"
        });
      } else {
        if (req.user) {
          const newCourse = new Course({
            user: req.user,
            title: req.body.title,
            description: req.body.description,
            estimatedTime: req.body.estimatedTime,
            materialsNeeded: req.body.materialsNeeded
          });
          newCourse
            .save()
            .then(result => {
              res
                .status(201)
                .json({ message: "Your course has been created." });
            })
            .catch(err => {
              console.log("[ ERROR ]", err);
              res.status(500).json({
                error: err
              });
            });
        } else {
          return res
            .status(400)
            .json({ message: "Please login to create post." });
        }
      }
    });
});

// READ - GET /api/courses 200 - Returns a list of courses (including the user that owns each )
router.get("/", (req, res, next) => {
  Course.find({})
    .sort({ createdAt: -1 })
    .populate("user", "firstName lastName")
    .exec(function(error, courses) {
      if (error) return next(error);
      res.json(courses);
    });
});

// READ - GET /api/courses/:id 200 - Returns a the course (including the user that owns the course) for the provided course ID
router.get("/:cID", (req, res, next) => {
  res.json(req.course);
});

// UPDATE - PUT /api/courses/:id 204 - Updates a course and returns no content
router.put("/:cID", (req, res, next) => {
  // console.log(`[ REQUEST ]`, req);
  console.log(`[ USER ID ]:`, req.user._id);
  console.log(`[ AUTHOR ID ]:`, req.body.user._id);
  // console.log(`[ REQ BODY ]:`, req.body);
  if (req.user) {
    console.log("yes there is a user");

    if (req.user._id.toString() === req.body.user._id.toString()) {
      console.log("is owner");

      Course.findOneAndUpdate(
        { _id: req.body._id },
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            estimatedTime: req.body.estimatedTime,
            materialsNeeded: req.body.materialsNeeded
          }
        }
      ).exec((error, course) => {
        if (error) {
          console.log(error);
          console.log("is not the owner");
          return next();
        } else {
          console.log(`course: "${req.body.title}" has been updated.`);
          return res.sendStatus(204);
          // return res.sendStatus(204);
        }
      });
    }
  } else {
    const error = new Error("Please login to update post.");
    error.status = 400;
    return next(error);
  }
});

// DELETE - DELETE /api/courses/:id 204 - Deletes a course and returns no content
router.delete("/:cID", (req, res, next) => {
  if (req.user) {
    if (req.course.user.toString() === req.user._id.toString()) {
      console.log("is owner");
      req.course.remove();
      return res.sendStatus(204);
    } else {
      console.log("is not the owner");
      const error = new Error("You are not authorized to delete this post");
      error.status = 400;
      return next(error);
    }
  } else {
    const error = new Error("Please login to delete post.");
    error.status = 400;
    return next(error);
  }
});

module.exports = router;
