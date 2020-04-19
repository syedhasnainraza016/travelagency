const Student = require("../models/User");
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
  res.render("student/studentAdd", { layout: "studentLayout" });
};

exports.update = async function(req, res) {
  let student = await Student.findOne({ _id: req.params.id });
  res.render("student/studentUpdate", {
    student,
    layout: "studentLayout"
  });
};

exports.create = (req, res) => {
  let student = new Student({
    roll: req.body.roll,
    name: req.body.name
  });

  student.save(function(err) {
    if (err) {
      return res
        .status(400)
        .json({ err: "Oops something went wrong! Cannont insert student.." });
    }
    req.flash("student_add_success_msg", "New Dish added successfully");
    res.redirect("/student.route/all");
  });
};

exports.details = (req, res) => {
  Student.findById(req.params.id, function(err, student) {
    if (err) {
      return res.status(400).json({
        err: `Oops something went wrong! Cannont find traveler with ${req.params.id}.`
      });
    }
    res.render("student/studentDetail", {
      student,
      layout: "studentLayout"
    });
  });
};

exports.all = (req, res) => {
  Student.find(function(err, students) {
    if (err) {
      return res
        .status(400)
        .json({ err: "Oops something went wrong! Cannont find students." });
    }
    res.status(200).render("student/studentAll", {
      students,
      layout: "studentLayout"
    });
    //res.send(students);
  });
};

// Post Update to insert data in database
exports.updateStudent = async (req, res) => {
  let result = await Student.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  if (!result)
    return res.status(400).json({
      err: `Oops something went wrong! Cannont update student with ${req.params.id}.`
    });
  req.flash("student_update_success_msg", "Student updated successfully");
  res.redirect("/student.route/all");
};

exports.delete = async (req, res) => {
  let result = await Student.deleteOne({ _id: req.params.id });
  if (!result)
    return res.status(400).json({
      err: `Oops something went wrong! Cannont delete traveler with ${req.params.id}.`
    });
  req.flash("student_del_success_msg", "Traveler has been deleted successfully");
  res.redirect("/mytravelers.route/all");
};

exports.allReport = (req, res) => {
  Student.find(function(err, students) {
    if (err) {
      return res
        .status(400)
        .json({ err: "Oops something went wrong! Cannont find students." });
    }
    res.status(200).render(
      "reports/student/allStudent",
      {
        students,
        layout: "studentLayout"
      },
      function(err, html) {
        pdf
          .create(html, options)
          .toFile("uploads/allStudents.pdf", function(err, result) {
            if (err) return console.log(err);
            else {
              var datafile = fs.readFileSync("uploads/allStudents.pdf");
              res.header("content-type", "application/pdf");
              res.send(datafile);
            }
          });
      }
    );
  });
};
