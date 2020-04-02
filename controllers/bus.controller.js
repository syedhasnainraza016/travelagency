const Bus = require("../models/bus.model");
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
  res.render("bus/busAdd", { layout: "layouts/studentLayout" });
};

exports.update = async function(req, res) {
  let bus = await Bus.findOne({ _id: req.params.id });
  res.render("bus/busUpdate", {
    bus,
    layout: "layouts/studentLayout"
  });
};

exports.create = (req, res) => {
  let bus = new Bus({
    no: req.body.no,
    name: req.body.name
  });

  bus.save(function(err) {
    if (err) {
      return res
        .status(400)
        .json({ err: "Oops something went wrong! Cannont insert bus.." });
    }
    req.flash("student_add_success_msg", "New bus added successfully");
    res.redirect("/admin/ball");
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
      layout: "layouts/studentLayout"
    });
  });
};

exports.all = (req, res) => {
  Bus.find(function(err, bus) {
    if (err) {
      return res
        .status(400)
        .json({ err: "Oops something went wrong! Cannont find bus." });
    }
    res.status(200).render("bus/busAll", {
      bus,
      layout: "layouts/studentLayout"
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
  req.flash("student_update_success_msg", "bus updated successfully");
  res.redirect("/admin/ball");
};

exports.delete = async (req, res) => {
  let result = await Bus.deleteOne({ _id: req.params.id });
  if (!result)
    return res.status(400).json({
      err: `Oops something went wrong! Cannont delete bus with ${req.params.id}.`
    });
  req.flash("student_del_success_msg", "bus has been deleted successfully");
  res.redirect("/admin/ball");
};