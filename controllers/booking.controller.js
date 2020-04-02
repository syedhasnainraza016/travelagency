// Load User model
const booking = require("../models/Booking");

exports.booking = (req, res) => {
    const {FName, LName,  Location,  Flight, Hotel, Bus, Resturant, PhoneNo, email} = req.body;
    let errors = [];
  
    if (!FName || !LName || !Location || !Flight || !Hotel || !Bus || !Resturant || !PhoneNo || !email) {
      errors.push({ msg: "Please enter all fields" });
    }
    else {
        const newbooking = new booking({
            FName, 
            LName, 
            Location,  
            Flight, 
            Hotel, 
            Bus, 
            Resturant,
            PhoneNo, 
            email,
        });
                newbooking.save()
                .then(Booking => {
                  req.flash(
                    "success_msg",
                    "You are now registered and can log in"
                  );
                  res.redirect("/agent/Panel");

                })

                .catch(err => console.log(err));
           
       
    }}