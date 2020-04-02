const Resturant = require("../models/resturant.model");
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
  res.render("resturant/resturantAdd", { layout: "layouts/studentLayout" });
};

exports.update = async function(req, res) {
  let resturant = await Resturant.findOne({ _id: req.params.id });
  res.render("resturant/resturantUpdate", {
    resturant,
    layout: "layouts/studentLayout"
  });
};

exports.create = (req, res) => {
  let resturant = new Resturant({
    no: req.body.no,
    name: req.body.name
  });

  resturant.save(function(err) {
    if (err) {
      return res
        .status(400)
        .json({ err: "Oops something went wrong! Cannont insert resturant.." });
    }
    req.flash("student_add_success_msg", "New resturant added successfully");
    res.redirect("/admin/all");
  });
};

exports.details = (req, res) => {
  Resturant.findById(req.params.id, function(err, resturant) {
    if (err) {
      return res.status(400).json({
        err: `Oops something went wrong! Cannont find resturant with ${req.params.id}.`
      });
    }
    res.render("resturant/resturantDetail", {
      resturant,
      layout: "layouts/studentLayout"
    });
  });
};

exports.all = (req, res) => {
  Resturant.find(function(err, resturant) {
    if (err) {
      return res
        .status(400)
        .json({ err: "Oops something went wrong! Cannont find resturant." });
    }
    res.status(200).render("resturant/resturantAll", {
      resturant,
      layout: "layouts/studentLayout"
    });
    //res.send(students);
  });
};

// Post Update to insert data in database
exports.updateResturant = async (req, res) => {
  let result = await Resturant.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  if (!result)
    return res.status(400).json({
      err: `Oops something went wrong! Cannont update resturant with ${req.params.id}.`
    });
  req.flash("student_update_success_msg", "Resturant updated successfully");
  res.redirect("/admin/all");
};

exports.delete = async (req, res) => {
  let result = await Resturant.deleteOne({ _id: req.params.id });
  if (!result)
    return res.status(400).json({
      err: `Oops something went wrong! Cannont delete resturant with ${req.params.id}.`
    });
  req.flash("student_del_success_msg", "Resturant has been deleted successfully");
  res.redirect("/admin/all");
};