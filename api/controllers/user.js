const User = require('../models/user')
const mongoose = require('mongoose')
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.user_get_all_users = (req, res) => {
    User.find()
      .select("email _id password")
      // .sort({price : -1})
      .exec()
      .then((users) => {
        const response = {
          count: users.length,
          users: users.map((user) => {
            return {
              _id: user._id,
              email: user.email,
              password: user.password,
            };
          }),
        };
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }


  exports.user_create_user = (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail already Exist",
          });
        } else {
          bycrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err,
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
              });
              user
                .save()
                .then((result) => {
                  console.log(result);
                  res.status(201).json({
                    message: "User Created",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({
                    error: err,
                  });
                });
            }
          });
        }
      });
  }


  exports.user_login_user = (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        bycrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(404).json({
              message: "Auth failed",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h",
              }
            );
            return res.status(201).json({
              message: "Auth successfull",
              token : token
            });
          }
          res.status(401).json({
            message: "Auth failed",
          });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }


  exports.user_delete_user = (req, res) => {
    const id = req.params.userId;
    console.log(req.params);
    User.remove({ _id: id })
      .exec()
      .then((user) => {
        console.log("User deleted.");
        res.status(200).json({
          message: "User deleted",
          count: user.length,
          user: user,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }