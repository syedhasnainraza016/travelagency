const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
//for comments
var express = require("express");
var app = new express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

// Passport Config
require("./config/passport")(passport);

// DB Config

// Connect to MongoDB
//mongoose
  //.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  //.then(() => console.log("MongoDB Connected"))
  //.catch(err => console.log(err));


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




//comment system
var Posts = require('./schema/posts');
var Comments = require('./schema/comments');

var port = process.env.PORT || 5000;


app.use(express.static(__dirname + "/public" ));
app.set('view engine', 'ejs');


app.get('/comments',function(req,res){
    Posts.find({}, function(err, posts) {
        if (err) {
          console.log(err);
        } else {
          res.render('comments', { posts: posts });
        }
    }); 
});


app.get('/posts/detail/:id',function(req,res){
    Posts.findById(req.params.id, function (err, postDetail) {
        if (err) {
          console.log(err);
        } else {
            Comments.find({'postId':req.params.id}, function (err, comments) {
                res.render('post-detail', { postDetail: postDetail, comments: comments, postId: req.params.id });
            });
        }
    }); 
});


// DB connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:12345admin@momgodb01-shard-00-00.dvkbv.mongodb.net:27017,momgodb01-shard-00-01.dvkbv.mongodb.net:27017,momgodb01-shard-00-02.dvkbv.mongodb.net:27017/test?ssl=true&replicaSet=atlas-spcaf7-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(() => console.log('connection succesful'))
.catch((err) => console.error(err));
// DB connection end


io.on('connection',function(socket){
    socket.on('comment',function(data){
        var commentData = new Comments(data);
        commentData.save();
        socket.broadcast.emit('comment',data);  
    });

});

http.listen(port,function(){
console.log("Server running at port "+ port);
});