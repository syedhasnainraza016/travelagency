const express = require("express");
const router = express.Router();

// Load User Controller
const agentController = require("../controllers/agent.controller");
const bookingController = require("../controllers/booking.controller");



const { forwardAuthenticated, ensureAuthenticated } = require("../config/agent.auth");

router.get('/SignInScreen', forwardAuthenticated, (req, res) => res.render('agentSignInScreen'));

router.get('/SignUp', forwardAuthenticated, (req, res) => res.render('agentSignup'));

router.get('/Panel', ensureAuthenticated, (req, res) => res.render('agentPanel'));

router.get('/Services', ensureAuthenticated, (req, res) => res.render('agentServices'));

router.get('/Traveler', ensureAuthenticated, (req, res) => res.render('agentTraveler'));

router.get('/My', ensureAuthenticated, (req, res) => res.render('agentMy'));

router.get('/flight', ensureAuthenticated, (req, res) => res.render('flight'));

router.get('/hotel', ensureAuthenticated, (req, res) => res.render('hotel'));

router.get('/bus', ensureAuthenticated, (req, res) => res.render('bus'));

router.get('/resturaunt', ensureAuthenticated, (req, res) => res.render('resturaunt'));

router.get('/Detail', ensureAuthenticated, (req, res) => res.render('AgenteditDetails'));

router.get('/locations', ensureAuthenticated, (req, res) => res.render('locations'));

router.get('/contact', ensureAuthenticated, agentController.contact);
router.post('/contact', agentController.contactUser);



// Login Page
router.get("/SignInScreen", forwardAuthenticated, agentController.login);
// Register Page
router.get("/SignUp", forwardAuthenticated, agentController.register);

// Register
router.post("/SignUp", agentController.registerAgent);

// Login
router.post("/SignInScreen", agentController.loginAgent);

// Logout
router.get("/logout", agentController.logout);

// Register Page
router.get("/Detail", ensureAuthenticated, bookingController.booking);

// Register
router.post("/Detail", bookingController.booking);

module.exports = router;
