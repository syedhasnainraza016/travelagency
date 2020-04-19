const bcrypt = require("bcryptjs");
const passport = require("passport");
const nodemailer = require('nodemailer');
// Load User model
const Agent = require("../models/Agent");

//Login Function
exports.login = (req, res) => res.render("agent/SignInScreen");

//Register Funcion
exports.register = (req, res) => res.render("agent/SignUp");

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

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


 //contact us
 exports.contact = (req, res) =>
  res.render("contact"
    );
 exports.contactUser=(req, res, next)=>{
 async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  const output = `
  <p>You have a new contact request</p>
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
