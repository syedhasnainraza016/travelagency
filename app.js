const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

// Passport Config
require("./config/passport")(passport);

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


  // Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());
// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.student_add_success_msg = req.flash("student_add_success_msg");
  res.locals.student_del_success_msg = req.flash("student_del_success_msg");
  res.locals.student_update_success_msg = req.flash(
    "student_update_success_msg"
  );
  res.locals.error = req.flash("error");
  next();
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
 
// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));
app.use("/admin", require("./routes/admin.js"));
app.use("/agent", require("./routes/agent.js"));
app.use("/student.route", require("./routes/mytravelers.route.js"));
app.use("/flight.route", require("./routes/flight.route.js"));
app.use("/hotel.route", require("./routes/hotel.route.js"));
app.use("/bus.route", require("./routes/bus.route.js"));
app.use("/resturant.route", require("./routes/resturant.route.js"));
app.use("/myagents.route", require("./routes/myagents.route.js"));



const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
