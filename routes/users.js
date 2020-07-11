const express = require('express');
const router = express.Router();
// Load User Controller
const userController = require('../controllers/user.controller')
const agentjobController = require('../controllers/agentjob.controller')
const { forwardAuthenticated, ensureAuthenticated } = require('../config/traveler.auth');

//traveler login page
router.get('/SignInScreen', forwardAuthenticated, (req, res) => res.render('travelerSignInScreen'));
//traveler  register page
router.get('/SignUpScreen', forwardAuthenticated, (req, res) => res.render('travelerSignUpScreen'));
//traveler panel
router.get('/tPanel', ensureAuthenticated, (req, res) => res.render('travelerPanel'));

router.get('/editDetails', ensureAuthenticated, (req, res) => res.render('editDetails'));

router.get('/Detail', ensureAuthenticated, (req, res) => res.render('agentjobform'));

router.get('/deleteConfirmation', ensureAuthenticated, (req, res) => res.render('allUsers'));


router.get('/contact', ensureAuthenticated, userController.contact);
router.post('/contact', userController.contactUser);
// Register Page
router.get("/Detail", ensureAuthenticated, agentjobController.form);

// Register
router.post("/Detail", agentjobController.form);

//Register Routes
// Login Page
router.get('/SignInScreen', forwardAuthenticated, userController.login);
// Register Page
router.get('/SignUpScreen', forwardAuthenticated, userController.register);

// Register
router.post('/SignUpScreen', userController.registerUser);

// Login
router.post('/SignInScreen', userController.loginUser);

// Logout
router.get('/logout', userController.logout);

module.exports = router;
