// Load User model
const agentjob = require("../models/agentjob");

exports.form = (req, res) => {
    const {FName, LName,  Country,  City, Area, Education, Rank, PhoneNo, email} = req.body;
    let errors = [];
  
    if (!FName || !LName || !Country || !City || !Area || !Education || !Rank || !PhoneNo || !email) {
      errors.push({ msg: "Please enter all fields" });
    }
    else {
        const newagentjob = new agentjob({
            FName, 
            LName, 
            Country,  
            City, 
            Area, 
            Rank, 
            Education,
            PhoneNo, 
            email,
        });
                newagentjob.save()
                .then(agentjob => {
                  req.flash(
                    "success_msg",
                    "Your Application Submitted Successfuly. We Will Contact You Soon!"
                  );
                  res.redirect("/users/tPanel");

                })

                .catch(err => console.log(err));
           
       
    }}