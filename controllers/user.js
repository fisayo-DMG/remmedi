const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

exports.signup = (req, res, next) => {
    const {password, email, dateOfBirth, firstName, lastName} = req.body
    bcrypt.hash(password, 10).then(
        (hash) => {
            const user = new User({
                email,
                password: hash,
                firstName,
                lastName,
                dateOfBirth
            });
            user.save().then(
                (user) => {
                    res.status(201).json({
                        message: 'User added suucessfully',
                        user: user,
                    });
                }
            ).catch((error) => {
                res.status(500).json({
                    error: error
                })
            })
        }
    )
}

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email}).then(
      (user) => {
        if(!user) {
          return res.status(401).json({
            error: new Error('User not found!')
          });
        }
        bcrypt.compare(req.body.password, user.password).then((valid) => {
          if(!valid){
            return res.status(401).json({
              error: new Error('Incorrect password')
            });
          }
          res.status(200).json({
            userId: user._id,
            token: 'token'
          });
        }).catch((error) => {
          res.status(500).json({
            error: error
          });
        })
      }
    ).catch((error) => {
      res.status(500).json({
        error: error
      });
    });
};