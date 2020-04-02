const Hotel = require("../models/hotel.model");
const fs = require("fs");
const options = { format: "A4" };

// test function
exports.test = function A(req, res) {
  res.render("test", {
    layout: "layouts/noLayout"
  });
};

// Add new hotel function
exports.add = function A(req, res) {
  res.render("hotel/hotelAdd", { layout: "layouts/studentLayout" });
};

exports.update = async function(req, res) {
  let hotel = await Hotel.findOne({ _id: req.params.id });
  res.render("hotel/hotelUpdate", {
    hotel,
    layout: "layouts/studentLayout"
  });
};

exports.create = (req, res) => {
  let hotel = new Hotel({
    no: req.body.no,
    name: req.body.name
  });

  hotel.save(function(err) {
    if (err) {
      return res
        .status(400)
        .json({ err: "Oops something went wrong! Cannont insert hotel.." });
    }
    req.flash("student_add_success_msg", "New hotel added successfully");
    res.redirect("/admin/hall");
  });

exports.details = (req, res) => {
  Hotel.findById(req.params.id, function(err, hotel) {
    if (err) {
      return res.status(400).json({
        err: `Oops something went wrong! Cannont find hotel with ${req.params.id}.`
      });
    }
    res.render("hotel/hotelDetail", {
      hotel,
      layout: "layouts/studentLayout"
    });
  });
};

exports.all = (req, res) => {
  Hotel.find(function(err, hotels) {
    if (err) {
      return res
        .status(400)
        .json({ err: "Oops something went wrong! Cannont find hotel." });
    }
    res.status(200).render("hotel/hotelAll", {
      hotel,
      layout: "layouts/studentLayout"
    });
    //res.send(students);
  });
};

// Post Update to insert data in database
exports.updateHotel = async (req, res) => {
  let result = await Hotel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  if (!result)
    return res.status(400).json({
      err: `Oops something went wrong! Cannont update hotel with ${req.params.id}.`
    });
  req.flash("student_update_success_msg", "Hotel updated successfully");
  res.redirect("/admin/hall");
};

exports.delete = async (req, res) => {
  let result = await Hotel.deleteOne({ _id: req.params.id });
  if (!result)
    return res.status(400).json({
      err: `Oops something went wrong! Cannont delete hotel with ${req.params.id}.`
    });
  req.flash("student_del_success_msg", "Hotel has been deleted successfully");
  res.redirect("/admin/hall");
}};