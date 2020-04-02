const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
const Agent = require("../models/User");

//Login Function
exports.login = (req, res) => res.render("agent/SignInScreen");

//Register Funcion
exports.register = (req, res) => res.render("agent/SignUp");



//Handle Post Request to add a new user
exports.registerAgent = (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("agentSignup", {
      errors,
      name,
      email,
      password,
      password2
    });
  }
   else {
    Agent.findOne({ email: email }).then(agent => {
      if (agent) {
        errors.push({ msg: "Email already exists" });
        res.render("agentSignup", {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newAgent = new Agent({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAgent.password, salt, (err, hash) => {
            if (err) throw err;
            newAgent.password = hash;
            newAgent
              .save()
              .then(Agent => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/agent/SignInScreen");
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
};

//Handle post request to Login a user
exports.loginAgent = (req, res, next) => {
  passport.authenticate("agent", {
    successRedirect: "/agent/Panel",
    failureRedirect: "/agent/SignInScreen",
    failureFlash: true
  })(req, res, next);
};

// Logout already logined user
exports.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/agent/SignInScreen");
};
