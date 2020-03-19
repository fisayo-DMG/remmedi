const express = require('express');
const router = express.Router();

const {login, signup, getUsers} = require('../controllers/user');

router
  .route('/signup')
  .post(signup)

router
  .route('/login')
  .post(login)

router
  .route('/')
  .get(getUsers)

module.exports = router;