const express = require("express");
const router = express.Router();
const { forwardAuthenticated, ensureAuthenticated } = require("../config/admin.auth");
// Load User Controller
const adminController = require("../controllers/admin.controller");
const bus_controller = require("../controllers/bus.controller");
const flight_controller = require("../controllers/flight.controller");
const resturant_controller = require("../controllers/resturant.controller");


router.get('/SignIn', forwardAuthenticated, (req, res) => res.render('adminSignIn'));

router.get('/SignUp', forwardAuthenticated, (req, res) => res.render('AdminSignUp'));

router.get('/Panel', ensureAuthenticated, (req, res) => res.render('adminPanel'));



//flight
router.get("/fadd", flight_controller.add);
router.post("/fadd", flight_controller.create);
//router.get("/fall", flight_controller.all);
//router.get("/:id", flight_controller.details);
//router.get("/fupdate/:id", flight_controller.update);
//router.post("/fupdate/:id", flight_controller.updateHotel);
//router.get("/fdelete/:id", flight_controller.delete);

//bus
router.get("/badd", bus_controller.add);
router.post("/badd", bus_controller.create);
//router.get("/ball", bus_controller.all);
//router.get("/:id", bus_controller.details);
//router.get("/bupdate/:id", bus_controller.update);
//router.post("/bupdate/:id", bus_controller.updateHotel);
//router.get("/bdelete/:id", bus_controller.delete);

//resturants
router.get("/radd", resturant_controller.add);
router.post("/radd", resturant_controller.create);
//router.get("/rall", resturant_controller.all);
//router.get("/:id", resturant_controller.details);
//router.get("/rupdate/:id", resturant_controller.update);
//router.post("/bupdate/:id", bus_controller.updateHotel);
//router.get("/bdelete/:id", bus_controller.delete);

// Login Page
router.get("/SignIn", forwardAuthenticated, adminController.login);
// Register Page
router.get("/SignUp", forwardAuthenticated, adminController.register);

// Register
router.post("/SignUp", adminController.registerAdmin);

// Login
router.post("/SignIn", adminController.loginAdmin);

// Logout
router.get("/logout", adminController.logout);

module.exports = router;
