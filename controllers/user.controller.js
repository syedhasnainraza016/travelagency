const bcrypt = require("bcryptjs");
const passport = require("passport");
const nodemailer = require('nodemailer');
// Load User model
const User = require("../models/User");

//Login Function
exports.login = (req, res) => res.render("travelerSignInScreen");

//Register Funcion
exports.register = (req, res) => res.render("travelerSignUpScreen");

//Handle Post Request to add a new user
exports.registerUser = (req, res) => {
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
    res.render("travelerSignUpScreen", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("travelerSignUpScreen", {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/SignInScreen");
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
};

//Handle post request to Login a user
exports.loginUser = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/users/tPanel",
    failureRedirect: "/users/SignInScreen",
    failureFlash: true
  })(req, res, next);
};

// Logout already logined user
exports.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/SignInScreen");
};

 //contact us
 exports.contact = (req, res) =>
  res.render("agenttoadmin"
    );
 exports.contactUser=(req, res, next)=>{
 async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  const output = `
  <p>You have a new Job Application</p>
  <h3>Contact Details</h3>
  <ul>  
    <li>Name: ${req.body.name}</li>
    <li>Company: ${req.body.company}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: "vidventures69@gmail.com", // generated ethereal user
      pass: "gamer4141101"// generated ethereal password
    },
    tls:{
      secureProtocol: "TLSv1_method"
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'vidventures69@gmail.com', // sender address
    to: "iamsyedhasnainraza@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text:req.body.message, // plain text body
     html:output // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
 }

 main().catch(console.error);
 res.end("you message has been send successfully")

}
