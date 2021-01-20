var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
let UserModel = require("../model/userModel");
let multer = require("multer");
let storage = multer.diskStorage({
  destination: "uploads/",
});

let upload = multer({ storage: storage });

/* GET users listing. */
router.post("/register", upload.single("file"), function (req, res, next) {
  let errors = [];
  req.check("name", "invalid name").isLength({ min: 3 });
  req.check("email", "email is invalid").isEmail();
  req
    .check("password", "Passwords are not the same")
    .equals(req.body.confirmPassword);

  errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    res.send({ errors });
  } else {
    let newUser = new UserModel({
      profileImage: req.file.filename,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    newUser
      .save()
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }
});

router.post("/login", function (req, res, next) {
  let loginInfo = req.body;
  UserModel.find({ name: loginInfo.name, password: loginInfo.password }).then(
    (queryResult) => {
      if (queryResult.length) {
        req.session.isLoggedIn = true;
        res.json({
          msg: `Successfully logged in, ${req.body.name}!`,
          session: req.session.isLoggedIn,
        });
      } else {
        res.json({
          msg: "log in error",
          session: req.session.isLoggedIn,
        });
      }
    }
  );
});

router.get("/logout", function (req, res, next) {
  req.session.isLoggedIn = false;
  req.json({
    msg: "successfully logged out",
    session: req.session.isLoggedIn,
  });
});

module.exports = router;
