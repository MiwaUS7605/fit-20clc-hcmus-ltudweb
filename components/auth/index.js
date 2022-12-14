const express = require('express');
const router = express.Router();
const passport= require('passport');

const authController=require('./AuthController');

router.get('/register', authController.showRegistrationForm);
router.post('/register', authController.register);

router.get('/login', authController.showLoginForm);
// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/auth/login',
// }));
router.get('/logout', authController.logout);

module.exports = router;
