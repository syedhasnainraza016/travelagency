const Bus = require("../models/bus.model");
const pdf = require("html-pdf");
const fs = require("fs");
const options = { format: "A4" };

// test function
exports.test = function A(req, res) {
  res.render("test", {
    layout: "noLayout"
  });
};

// Add new bus function
exports.add = function A(req, res) {
  res.render("bus/busAdd", { layout: "studentLayout" });
};

exports.update = async function(req, res) {
  let bus = await Bus.findOne({ _id: req.params.id });
  res.render("bus/busUpdate", {
    bus,
    layout: "studentLayout"
  });
};

exports.create = (req, res) => {
  let bus = new Bus({
    roll: req.body.roll,
    name: req.body.name
  });

  bus.save(function(err) {
    if (err) {
      return res
        .status(400)
        .json({ err: "Oops something went wrong! Cannont insert bus.." });
    }
    req.flash("student_add_success_msg", "New bus added successfully");
    res.redirect("/bus.route/all");
  });
};

exports.details = (req, res) => {
  Bus.findById(req.params.id, function(err, bus) {
    if (err) {
      return res.status(400).json({
        err: `Oops something went wrong! Cannont find bus with ${req.params.id}.`
      });
    }
    res.render("bus/busDetail", {
      bus,
      layout: "studentLayout"
    });
  });
};

exports.all = (req, res) => {
  Bus.find(function(err, buss) {
    if (err) {
      return res
        .status(400)
        .json({ err: "Oops something went wrong! Cannont find buses." });
    }
    res.status(200).render("bus/busAll", {
      buss,
      layout: "studentLayout"
    });
    //res.send(students);
  });
};

// Post Update to insert data in database
exports.updateBus = async (req, res) => {
  let result = await Bus.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  if (!result)
    return res.status(400).json({
      err: `Oops something went wrong! Cannont update bus with ${req.params.id}.`
    });
  req.flash("student_update_success_msg", "Bus updated successfully");
  res.redirect("/bus.route/all");
};

exports.delete = async (req, res) => {
  let result = await Bus.deleteOne({ _id: req.params.id });
  if (!result)
    return res.status(400).json({
      err: `Oops something went wrong! Cannont delete bus with ${req.params.id}.`
    });
  req.flash("student_del_success_msg", "Bus has been deleted successfully");
  res.redirect("/bus.route/all");
};

exports.allReport = (req, res) => {
  Bus.find(function(err, buss) {
    if (err) {
      return res
        .status(400)
        .json({ err: "Oops something went wrong! Cannont find buses." });
    }
    res.status(200).render(
      "reports/student/allbus",
      {
        buss,
        layout: "studentLayout"
      },
      function(err, html) {
        pdf
          .create(html, options)
          .toFile("uploads/BusesReport.pdf", function(err, result) {
            if (err) return console.log(err);
            else {
              var datafile = fs.readFileSync("uploads/BusesReport.pdf");
              res.header("content-type", "application/pdf");
              res.send(datafile);
            }
          });
      }
    );
  });
};
