"use strict";

const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const validateNewCourse = require("../validation/NewCourse");

router.param("cID", function(req, res, next, id) {
  // console.log("REQ", req);
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
router.post("/", (req, res) => {
  console.log(req.body);
  // validation
  const { errors, isValid } = validateNewCourse(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Course.find({ title: req.body.title })
    .exec()
    .then(course => {
      if (course.length >= 1) {
        return res.status(409).json({
          message: "There is already a course with that title"
        });
      } else {
        if (req.body.user) {
          const newCourse = new Course({
            user: req.body.user,
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
            .catch(error => {
              res.status(500).json({
                error
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
  console.log(`[ REQUEST ]`, req.body._id);
  if (req.body.user) {
    console.log("yes there is a user");

    if (req.body.user._id.toString() === req.body.user._id.toString()) {
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
          return next();
        } else {
          return res.sendStatus(204);
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
  if (req.body) {
    console.log("[COURSE USER]", req.course.user[0]._id);
    console.log("[USER]", req.body._id);
    if (req.course.user[0]._id.toString() === req.body._id) {
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
