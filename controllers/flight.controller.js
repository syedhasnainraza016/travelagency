const Flight = require("../models/flight.model");
const fs = require("fs");
const options = { format: "A4" };

// test function
exports.test = function A(req, res) {
  res.render("test", {
    layout: "layouts/noLayout"
  });
};

// Add new student function
exports.add = function A(req, res) {
  res.render("flight/flightAdd", { layout: "layouts/studentLayout" });
};

exports.update = async function(req, res) {
  let flight = await Flight.findOne({ _id: req.params.id });
  res.render("flight/flightUpdate", {
    flight,
    layout: "layouts/studentLayout"
  });
};

exports.create = (req, res) => {
  let flight = new Flight({
    no: req.body.no,
    name: req.body.name
  });

  flight.save(function(err) {
    if (err) {
      return res
        .status(400)
        .json({ err: "Oops something went wrong! Cannont insert flight.." });
    }
    req.flash("student_add_success_msg", "New flight added successfully");
    res.redirect("/admin/fall");
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
      layout: "layouts/studentLayout"
    });
  });
};

exports.all = (req, res) => {
  Flight.find(function(err, flight) {
    if (err) {
      return res
        .status(400)
        .json({ err: "Oops something went wrong! Cannont find flight." });
    }
    res.status(200).render("flight/flightAll", {
      flight,
      layout: "layouts/studentLayout"
    });
    //res.send(students);
  });
};

// Post Update to insert data in database
exports.updateFlight = async (req, res) => {
  let result = await flight.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  if (!result)
    return res.status(400).json({
      err: `Oops something went wrong! Cannont update flight with ${req.params.id}.`
    });
  req.flash("student_update_success_msg", "flight updated successfully");
  res.redirect("/admin/fall");
};

exports.delete = async (req, res) => {
  let result = await Flight.deleteOne({ _id: req.params.id });
  if (!result)
    return res.status(400).json({
      err: `Oops something went wrong! Cannont delete flight with ${req.params.id}.`
    });
  req.flash("student_del_success_msg", "flight has been deleted successfully");
  res.redirect("/admin/fall");
};