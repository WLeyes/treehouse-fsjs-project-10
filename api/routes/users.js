"use strict";

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const auth = require("basic-auth");

const validateUserSignUp = require("../validation/UserSignUp");
const validateUserLogin = require("../validation/UserLogin");

// CREATE a user, sets the Location header to "/", and returns no content
// @route POST /api/users
router.post("/", (req, res, next) => {
  // validation
  const { errors, isValid } = validateUserSignUp(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ emailAddress: req.body.emailAddress }).then(user => {
    if (user) {
      return res.status(409).json({
        message: "Email address is already assigned to an account."
      });
    }

    bcrypt.hash(req.body.password, 10, (error, hashedPassword) => {
      if (error) {
        return res.status(500).json({
          error
        });
      } else {
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          emailAddress: req.body.emailAddress,
          password: hashedPassword
        });
        user
          .save()
          .then(result => {
            res.status(201).json({ message: "Your account has been created." });
          })
          .catch(error => {
            res.status(500).json({
              error
            });
          });
      }
    });
  });
});

// GET USER
// Middleware Returns the currently authenticated user || todo: fix if username is wrong
router.use((req, res, next) => {
  console.log(auth(req));
  // validation
  const { errors, isValid } = validateUserLogin(auth(req));
  if (!isValid) {
    return res.status(400).json(errors);
  }
  auth(req)
    ? User.findOne({ emailAddress: auth(req).name }).exec(function(err, user) {
        if (user) {
          if (bcrypt.compareSync(auth(req).pass, user.password)) {
            req.user = user;

            next();
          } else {
            return res.status(409).json({
              password: "Invalid password"
            });
          }
        } else {
          return res.status(409).json({
            password: "User not found"
          });
        }
      })
    : next();
});

// READ - GET /api/users 200 - Returns the currently authenticated user
router.get("/", (req, res, next) => {
  User.find({}).exec(function(err, user) {
    if (err) return next(err);
    res.json(req.user);
  });
});

// UPDATE

// DELETE

module.exports = router;
