const Flight = require("../models/flight.model");
const pdf = require("html-pdf");
const fs = require("fs");
const options = { format: "A4" };

// test function
exports.test = function A(req, res) {
  res.render("test", {
    layout: "noLayout"
  });
};

// Add new student function
exports.add = function A(req, res) {
  res.render("flight/flightAdd", { layout: "studentLayout" });
};

exports.update = async function(req, res) {
  let flight = await Flight.findOne({ _id: req.params.id });
  res.render("flight/flightUpdate", {
    flight,
    layout: "studentLayout"
  });
};

exports.create = (req, res) => {
  let flight = new Flight({
    roll: req.body.roll,
    name: req.body.name
  });

  flight.save(function(err) {
    if (err) {
      return res
        .status(400)
        .json({ err: "Oops something went wrong! Cannont insert flight.." });
    }
    req.flash("student_add_success_msg", "New flight added successfully");
    res.redirect("/flight.route/all");
  });
};

exports.details = (req, res) => {
  Flight.findById(req.params.id, function(err, flight) {
    if (err) {
      return res.status(400).json({
        err: `Oops something went wrong! Cannont find flight with ${req.params.id}.`
      });
    }
    res.render("flight/flightDetail", {
      flight,
      layout: "studentLayout"
    });
  });
};

exports.all = (req, res) => {
  Flight.find(function(err, flights) {
    if (err) {
      return res
        .status(400)
        .json({ err: "Oops something went wrong! Cannont find flights." });
    }
    res.status(200).render("flight/flightAll", {
      flights,
      layout: "studentLayout"
    });
    //res.send(students);
  });
};

// Post Update to insert data in database
exports.updateFlight = async (req, res) => {
  let result = await Flight.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  if (!result)
    return res.status(400).json({
      err: `Oops something went wrong! Cannont update flight with ${req.params.id}.`
    });
  req.flash("student_update_success_msg", "Flight updated successfully");
  res.redirect("/flight.route/all");
};

exports.delete = async (req, res) => {
  let result = await Flight.deleteOne({ _id: req.params.id });
  if (!result)
    return res.status(400).json({
      err: `Oops something went wrong! Cannont delete flight with ${req.params.id}.`
    });
  req.flash("student_del_success_msg", "flight has been deleted successfully");
  res.redirect("/flight.route/all");
};

exports.allReport = (req, res) => {
  Flight.find(function(err, flights) {
    if (err) {
      return res
        .status(400)
        .json({ err: "Oops something went wrong! Cannont find flights." });
    }
    res.status(200).render(
      "reports/student/allflight",
      {
        flights,
        layout: "studentLayout"
      },
      function(err, html) {
        pdf
          .create(html, options)
          .toFile("uploads/FlightsReport.pdf", function(err, result) {
            if (err) return console.log(err);
            else {
              var datafile = fs.readFileSync("uploads/FlightsReport.pdf");
              res.header("content-type", "application/pdf");
              res.send(datafile);
            }
          });
      }
    );
  });
};
