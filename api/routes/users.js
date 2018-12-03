"use strict";

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("basic-auth");

const validateUserSignUp = require("../validation/UserSignUp");
const validateUserLogin = require("../validation/UserLogin");

// CREATE a user, sets the Location header to "/", and returns no content
// @route POST /api/users
router.post("/", (req, res, next) => {
  console.log("[REQUEST]", req.body);
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

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({
          error: err
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
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
      }
    });
  });
});

// Middleware GETs the currently authenticated user
// @route GET /api/users
router.use((req, res, next) => {
  const { errors, isValid } = validateUserLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  auth(req)
    ? User.findOne({ emailAddress: auth(req).name }).exec(function(err, user) {
        if (!user) {
          errors.emailAddress = "User not found";
          return res.status(401).json(errors);
        }
        if (bcrypt.compare(auth(req).pass, user.password)) {
          req.user = user;
          next();
        } else {
          errors.password = "Invalid password";
          return res.status(401).json(errors);
        }
        next();
      })
    : next();
});
router.get("/", (req, res, next) => {
  User.find({}).exec(function(err, user) {
    if (err) return next(err);
    res.json(req.user);
  });
});

// UPDATE

// DELETE

module.exports = router;
