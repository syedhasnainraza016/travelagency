const Hotel = require("../models/myhotel.model");
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
  res.render("hotel/hotelAdd", { layout: "studentLayout" });
};

exports.update = async function(req, res) {
  let hotel = await Hotel.findOne({ _id: req.params.id });
  res.render("hotel/hotelUpdate", {
    hotel,
    layout: "studentLayout"
  });
};

exports.create = (req, res) => {
  let hotel = new Hotel({
    roll: req.body.roll,
    name: req.body.name
  });

  hotel.save(function(err) {
    if (err) {
      return res
        .status(400)
        .json({ err: "Oops something went wrong! Cannont insert student.." });
    }
    req.flash("student_add_success_msg", "New Hotel added successfully");
    res.redirect("/hotel.route/all");
  });
};

exports.details = (req, res) => {
  Hotel.findById(req.params.id, function(err, hotel) {
    if (err) {
      return res.status(400).json({
        err: `Oops something went wrong! Cannont find Hotel with ${req.params.id}.`
      });
    }
    res.render("hotel/hotelDetail", {
      hotel,
      layout: "studentLayout"
    });
  });
};

exports.all = (req, res) => {
  Hotel.find(function(err, hotels) {
    if (err) {
      return res
        .status(400)
        .json({ err: "Oops something went wrong! Cannont find students." });
    }
    res.status(200).render("hotel/hotelAll", {
      hotels,
      layout: "studentLayout"
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
  res.redirect("/hotel.route/all");
};

exports.delete = async (req, res) => {
  let result = await Hotel.deleteOne({ _id: req.params.id });
  if (!result)
    return res.status(400).json({
      err: `Oops something went wrong! Cannont delete hotel with ${req.params.id}.`
    });
  req.flash("student_del_success_msg", "Hotel has been deleted successfully");
  res.redirect("/hotel.route/all");
};

exports.allReport = (req, res) => {
  Hotel.find(function(err, hotels) {
    if (err) {
      return res
        .status(400)
        .json({ err: "Oops something went wrong! Cannont find hotels." });
    }
    res.status(200).render(
      "reports/hotel/allhotel",
      {
        hotels,
        layout: "studentLayout"
      },
      function(err, html) {
        pdf
          .create(html, options)
          .toFile("uploads/HotelsReport.pdf", function(err, result) {
            if (err) return console.log(err);
            else {
              var datafile = fs.readFileSync("uploads/HotelsReport.pdf");
              res.header("content-type", "application/pdf");
              res.send(datafile);
            }
          });
      }
    );
  });
};
